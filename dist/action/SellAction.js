import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
export class NPlusSellAction {
    accessToken;
    qty;
    bPercent;
    price;
    static instance;
    constructor(accessToken, qty, bPercent, price) {
        this.accessToken = accessToken;
        this.qty = qty;
        this.bPercent = bPercent;
        this.price = price;
    }
    async action() {
        const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
        await new TradingOrder.Builder(this.accessToken, sell, config.symbolInverse, "01", String(this.qty), "0")
            .build()
            .handle();
        // await setValue(
        //   "tradingTime",
        //   `${String(getTimeInterval(getTradingTime(), 5).index)}+sell`
        // ),
        // await logInsert("매도", this.symbol, this.qty);
        // await sendMail("TRADING_TRY", {
        //   symbolName: this.symbol,
        //   tradingCount: this.qty,
        //   type: "매도",
        //   date: getNowDate(),
        //   bPercent: this.bPercent,
        //   money: this.price,
        //   rsi:"알 필요 없음",
        // });
    }
    static getInstance(accessToken, qty, bPercent, price) {
        if (!this.instance) {
            return new NPlusSellAction(accessToken, qty, bPercent, price);
        }
        return this.instance;
    }
}
class UpDownSellAction {
    static instance;
    async action() { }
    static getInstance() {
        if (!this.instance) {
            return new UpDownSellAction();
        }
        return this.instance;
    }
}
