import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
import { logInsert } from "../db/insert.js";
import { getValue, setValue } from "../db/redisManager.js";
import sendMail from "../mail/sendMail.js";
import getNowDate from "../util/getNowDate.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
import isTradingAllowed from "../util/isTradeAllowed.js";
export class NPlusSellHahavior {
    currentHoldings;
    price;
    buyPrice;
    accessToken;
    qty;
    bPercent;
    static instance;
    constructor(currentHoldings, price, buyPrice, accessToken, qty, bPercent) {
        this.currentHoldings = currentHoldings;
        this.price = price;
        this.buyPrice = buyPrice;
        this.accessToken = accessToken;
        this.qty = qty;
        this.bPercent = bPercent;
    }
    async evaluate() {
        const canSell = await isTradingAllowed("sell");
        if (canSell &&
            this.currentHoldings === Number(await getValue("buyCount")) &&
            this.price >= this.buyPrice + 5) {
            return true;
        }
        return false;
    }
    async action() {
        const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
        await new TradingOrder.Builder(this.accessToken, sell, config.symbolInverse, "01", String(this.qty), "0")
            .build()
            .handle();
        await this.notice();
    }
    async notice() {
        await setValue("tradingTime", `${String(getTimeInterval(getTradingTime(), 5).index)}+sell`),
            await logInsert("매도", config.symbolInverse, this.qty);
        await sendMail("TRADING_TRY", {
            symbolName: config.symbolInverse,
            tradingCount: this.qty,
            type: "매도",
            date: getNowDate(),
            bPercent: this.bPercent,
            money: this.price,
            rsi: "알 필요 없음",
        });
    }
    static getInstance(currentHoldings, price, buyPrice, accessToken, qty, bPercent) {
        if (!this.instance) {
            return new NPlusSellHahavior(currentHoldings, price, buyPrice, accessToken, qty, bPercent);
        }
        return this.instance;
    }
}
export class UpDownSellHahavior {
    evaluate() {
        throw new Error("Method not implemented.");
    }
    action() {
        throw new Error("Method not implemented.");
    }
}
