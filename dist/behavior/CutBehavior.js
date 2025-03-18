import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
import { logInsert } from "../db/insert.js";
import { getValue, setValue } from "../db/redisManager.js";
import sendMail from "../mail/sendMail.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
import isTradingAllowed from "../util/isTradeAllowed.js";
export class NPlusCutBehavior {
    sellPrice;
    price;
    data;
    accessToken;
    static instance;
    constructor(sellPrice, price, data, accessToken) {
        this.sellPrice = sellPrice;
        this.price = price;
        this.data = data;
        this.accessToken = accessToken;
    }
    async evaluate() {
        const canCutOff = await isTradingAllowed("cut");
        if (canCutOff &&
            this.sellPrice !== null &&
            this.sellPrice > this.price &&
            Number(this.data.output1[0].hldg_qty) ===
                Number(await getValue("buyCount"))) {
            return true;
        }
        return false;
    }
    async action() {
        console.log(2);
        const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
        await new TradingOrder.Builder(this.accessToken, sell, this.data.output1[0].pdno, "00", String(this.data.output1[0].hldg_qty), String(this.price))
            .build()
            .handle();
        await this.notice();
    }
    async notice() {
        await setValue("tradingTime", `${String(getTimeInterval(getTradingTime(), 5).index)}+cut`);
        await logInsert("매도", this.data.output1[0].prdt_name, this.data.output1[0].hldg_qty);
        await sendMail("TRADING_CUT_OFF", {
            cutOffPrice: this.sellPrice,
            currentPrice: this.price,
            symbol: this.data.output1[0].prdt_name,
            tradingCount: this.data.output1[0].hldg_qty,
            money: this.price,
            type: "손절 매도",
        });
    }
    static getInstance(sellPrice, price, data) {
        if (!this.instance) {
            return new NPlusCutBehavior(sellPrice, price, data);
        }
        return this.instance;
    }
}
export class UpDownCutBehavior {
    evaluate() {
        throw new Error("Method not implemented.");
    }
    action() {
        throw new Error("Method not implemented.");
    }
}
