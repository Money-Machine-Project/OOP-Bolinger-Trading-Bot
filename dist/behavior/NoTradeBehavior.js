import RetradingOrder from "../api/core/RetradingOrder.js";
import TradingOrder from "../api/core/TradingOrder.js";
import TradingSettlementDetail from "../api/core/TradingSettlementDetail.js";
import config from "../config/config.js";
import { setValue } from "../db/redisManager.js";
import checkTradingTimeExceed from "../util/checkTradingTimeExceed.js";
import getKoreaDate from "../util/getKoreaDate.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
export class NPlusNoTradeBehavior {
    tradingTime;
    accessToken;
    static instance;
    constructor(tradingTime, accessToken) {
        this.tradingTime = tradingTime;
        this.accessToken = accessToken;
    }
    async evaluate() {
        if (this.tradingTime !== null &&
            (this.tradingTime.split("+")[1] === "sell" ||
                this.tradingTime.split("+")[1] === "buy") &&
            checkTradingTimeExceed(this.tradingTime.split("+")[0])) {
            return true;
        }
        return false;
    }
    async action() {
        console.log(1);
        let result = await new TradingSettlementDetail.Builder(getKoreaDate(), this.accessToken, config.symbolInverse, "00", "02")
            .build()
            .handle();
        if (!result.output[0]) {
            setValue("tradingTime", `${String(getTimeInterval(getTradingTime(), 5).index)}+sell`);
            return;
        }
        if (result.output[0].sll_buy_dvsn_cd_name === "매도") {
            await new RetradingOrder.Builder(this.accessToken, String(result.output[0].odno), "01", "01", String(result.output[0].rmn_qty), "0")
                .build()
                .handle();
        }
        else {
            // 전량취소
            await new RetradingOrder.Builder(this.accessToken, String(result.output[0].odno), "01", "02", String(result.output[0].rmn_qty), "0")
                .build()
                .handle();
            // 나머지 매도
            const sellTrId = config.status === "virtual" ? "VTTC0801U" : "TTTC0801U";
            await new TradingOrder.Builder(this.accessToken, sellTrId, // tr_id
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
        //   logInsert("거래 청산", "0", 0),
        // ]);
    }
    static getInstance(tradingTime, accessToken) {
        if (!this.instance) {
            return new NPlusNoTradeBehavior(tradingTime, accessToken);
        }
        return this.instance;
    }
}
export class UpDownNoTradeBehavior {
    evaluate() {
        throw new Error("Method not implemented.");
    }
    action() {
        throw new Error("Method not implemented.");
    }
}
