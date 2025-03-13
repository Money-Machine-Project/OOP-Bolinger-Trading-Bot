import CanBuy from "../api/core/CanBuy.js";
import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
import isTradingAllowed from "../util/isTradeAllowed.js";
export class NPlusBuyBehavior {
    bPercent;
    currentHoldings;
    rsi;
    price;
    accessToken;
    static instance;
    constructor(bPercent, currentHoldings, rsi, price, accessToken) {
        this.bPercent = bPercent;
        this.currentHoldings = currentHoldings;
        this.rsi = rsi;
        this.price = price;
        this.accessToken = accessToken;
    }
    async evaluate() {
        const canBuy = await isTradingAllowed("buy");
        if (canBuy &&
            0.3 >= this.bPercent &&
            this.currentHoldings === 0 &&
            this.rsi <= 50 &&
            Math.floor(this.price) % 5 === 0) {
            return true;
        }
        return false;
    }
    async action() {
        const buy = config.status === "virtual" ? "VTTC0802U" : "TTTC0012U";
        const canBuy = await new CanBuy.Builder(this.accessToken, config.symbolInverse, "01", "01", "N", "N")
            .build()
            .handle();
        //  await sleep(1000);
        const buyCount = Math.floor(Number(canBuy.nrcvb_buy_amt) / this.price) - 1;
        if (Number(canBuy.max_buy_qty) > 0 && buyCount !== 0) {
            await new TradingOrder.Builder(this.accessToken, buy, config.symbolInverse, "01", String(buyCount), "0")
                .build()
                .handle();
            // await Promise.all([
            //   setValue("buyPrice", String(this.price)),
            //   setValue("buyCount", String(buyCount)),
            //   setValue("sellPrice", String(Number(this.price) - 10)),
            //   setValue(
            //     "tradingTime",
            //     `${String(getTimeInterval(getTradingTime(), 5).index)}+buy`
            //   ),
            // ]);
            // await logInsert("매수",this.symbol, buyCount);
            // await sendMail("TRADING_TRY", {
            //   symbolName: this.symbol,
            //   tradingCount: buyCount,
            //   type: "매수",
            //   date: getNowDate(),
            //   bPercent: this.bPercent,
            //   money: this.price,
            //   rsi:this.rsi,
            // });
        }
    }
    static getInstance(bPercent, currentHoldings, rsi, price) {
        if (!this.instance) {
            return new NPlusBuyBehavior(bPercent, currentHoldings, rsi, price);
        }
        return this.instance;
    }
}
export class UpDownBuyBehavior {
    evaluate() {
        throw new Error("Method not implemented.");
    }
    action() {
        throw new Error("Method not implemented.");
    }
}
