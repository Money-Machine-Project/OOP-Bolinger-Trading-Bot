import schedule from "node-schedule";
import { redisStatusCheck } from "../util/serverStatusCheck.js";
import { deleteValue, getValue } from "../db/redisManager.js";
import retryOperation from "../util/retryOperation.js";
import sleep from "../util/sleep.js";
import { logInsert } from "../db/insert.js";
import getKoreaDate from "../util/getKoreaDate.js";
import TradingSettlementDetail from "../api/core/TradingSettlementDetail.js";
import RetradingOrder from "../api/core/RetradingOrder.js";
import StockBalance from "../api/core/StockBalance.js";
import TradingOrder from "../api/core/TradingOrder.js";
/**
 * 보유 주식 전량 매도 스케줄러
 * @param {*} accessToken 접근 토큰
 */
const sellAllStocksScheduler = async () => {
    schedule.scheduleJob("01 9,15 * * 1-5", async function () {
        console.log("전량 매도 스케줄러 실행");
        try {
            await redisStatusCheck();
            const accessToken = await getValue("accessToken");
            await retryOperation(async () => {
                const object = new TradingSettlementDetail.Builder(getKoreaDate(), accessToken, process.env.SYMBOL_INVERSE, "00", "02").build();
                let result = await object.handle();
                await sleep(1000);
                if (result.output[0]) {
                    // 미체결 거래가 있다면
                    for (const element of result.output) {
                        const object = new RetradingOrder.Builder(accessToken, String(element.odno), "01", "02", String(element.rmn_qty), "0").build();
                        await object.handle();
                        await sleep(1000);
                    }
                }
                const stockBalanceOb = new StockBalance.Builder(accessToken).build();
                const data = await stockBalanceOb.handle();
                if (!data.output1[0]) {
                    console.log("보유 주식이 없습니다.");
                    return;
                }
                for (const element of data.output1) {
                    await new TradingOrder.Builder(accessToken, "VTTC0801U", element.pdno, "01", element.hldg_qty, "0")
                        .build()
                        .handle();
                    await logInsert("매도", element.prdt_name, element.hldg_qty);
                    await sleep(1000);
                }
                console.log("전량 매도 완료");
                await Promise.all([
                    deleteValue("cutOff"),
                    deleteValue("upDown"),
                    deleteValue("tradingTime"),
                    deleteValue("trading"),
                ]);
            }, 3, 5000); // 최대 3번 재시도, 5초 간격
        }
        catch (error) {
            console.error("전량 매도 실패:", error);
        }
    });
    console.log("전량 매도 스케줄러가 설정되었습니다. 월-금 9:01과 15:01에 실행됩니다.");
};
export default sellAllStocksScheduler;
