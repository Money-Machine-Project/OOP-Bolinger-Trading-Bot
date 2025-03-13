import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
export class NPlusCutAction {
    accessToken;
    data;
    price;
    sellPrice;
    static instance;
    constructor(accessToken, data, price, sellPrice) {
        this.accessToken = accessToken;
        this.data = data;
        this.price = price;
        this.sellPrice = sellPrice;
    }
    async action() {
        const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
        await new TradingOrder.Builder(this.accessToken, sell, this.data.output1[0].pdno, "00", String(this.data.output1[0].hldg_qty), String(this.price))
            .build()
            .handle();
        // await setValue(
        //   "tradingTime",
        //   `${String(getTimeInterval(getTradingTime(), 5).index)}+cut`
        // );
        // await logInsert(
        //   "매도",
        //   this.data.output1[0].prdt_name,
        //   this.data.output1[0].hldg_qty
        // );
        // await sendMail("TRADING_CUT_OFF", {
        //   cutOffPrice: this.sellPrice,
        //   currentPrice: this.price,
        //   symbol: this.data.output1[0].prdt_name,
        //   tradingCount: this.data.output1[0].hldg_qty,
        //   money: this.price,
        //   type: "손절 매도",
        // });
    }
    static getInstance(accessToken, data, price, sellPrice) {
        if (!this.instance) {
            return new NPlusCutAction(accessToken, data, price, sellPrice);
        }
        return this.instance;
    }
}
class UpDownCutAction {
    static instance;
    async action() { }
    static getInstance() {
        if (!this.instance) {
            return new UpDownCutAction();
        }
        return this.instance;
    }
}
