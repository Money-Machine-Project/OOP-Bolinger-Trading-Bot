import RetradingOrder from "../api/core/RetradingOrder.js";
import TradingOrder from "../api/core/TradingOrder.js";
import TradingSettlementDetail from "../api/core/TradingSettlementDetail.js";
import config from "../config/config.js";
import { getValue, setValue } from "../db/redisManager.js";
import getKoreaDate from "../util/getKoreaDate.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
export class NPlusNoTradingAction {
    static instance;
    async action() {
        const accessToken = await getValue("accessToken");
        let result = await new TradingSettlementDetail.Builder(getKoreaDate(), accessToken, config.symbolInverse, "00", "02")
            .build()
            .handle();
        if (!result.output[0]) {
            setValue("tradingTime", `${String(getTimeInterval(getTradingTime(), 5).index)}+sell`);
            return;
            // 진행 되어야 함.
        }
        if (result.output[0].sll_buy_dvsn_cd_name === "매도") {
            await new RetradingOrder.Builder(accessToken, String(result.output[0].odno), "01", "01", String(result.output[0].rmn_qty), "0")
                .build()
                .handle();
        }
        else {
            // 전량취소
            await new RetradingOrder.Builder(accessToken, String(result.output[0].odno), "01", "02", String(result.output[0].rmn_qty), "0")
                .build()
                .handle();
            // 나머지 매도
            const sellTrId = config.status === "virtual" ? "VTTC0801U" : "TTTC0801U";
            await new TradingOrder.Builder(accessToken, sellTrId, // tr_id
            result.output[0].pdno, "01", String(Number(result.output[0].ord_qty) - Number(result.output[0].rmn_qty)), "0")
                .build()
                .handle();
        }
        console.log("완료");
        // await Promise.all([
        //   setValue(
        //     "tradingTime",
        //     `${String(getTimeInterval(getTradingTime(), 5).index)}+sell`
        //   ),
        //   sendMail("TRADING_TIME_OUT", {}),
        //   logInsert("거래 청산", 0, 0),
        // ]);
    }
    static getInstance() {
        if (!this.instance) {
            return new NPlusNoTradingAction();
        }
        return this.instance;
    }
}
class UpDownNoTradingAction {
    static instance;
    async action() { }
    static getInstance() {
        if (!this.instance) {
            return new UpDownNoTradingAction();
        }
        return this.instance;
    }
}
