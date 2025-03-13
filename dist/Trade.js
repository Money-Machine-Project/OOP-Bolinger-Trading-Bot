import config from "./config/config.js";
import TradingOrder from "./api/core/TradingOrder.js";
import CanBuy from "./api/core/CanBuy.js";
class TradeBuilder {
    element;
    constructor() { }
    build() {
        return this.element;
    }
}
class TradeElement {
    accessToken;
    symbol;
    realTimeData;
    constructor(accessToken, symbol, realTimeData) {
        this.accessToken = accessToken;
        this.symbol = symbol;
        this.realTimeData = realTimeData;
    }
}
export class Sell extends TradeElement {
    qty;
    constructor(qty, accessToken, symbol, realTimeData) {
        super(accessToken, symbol, realTimeData);
        this.qty = qty;
    }
    async handle() {
        const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
        await new TradingOrder.Builder(this.accessToken, sell, this.symbol, "01", String(this.qty), "0")
            .build()
            .handle();
        // 어떤 전략인지에 따라 StrategyElement 요소가 달라진다. 위 플래그 설정을 전략 exe()에서 pub/sub패턴을 이용하여 세팅
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
        //   bPercent: this.strategyElement.bPercent,
        //   money: this.realTimeData,
        //   rsi: this.strategyElement.rsi,
        // });
    }
    static Builder = class SellBuilder extends TradeBuilder {
        element;
        constructor(qty, accessToken, symbol, realTimeData) {
            super();
            this.element = new Sell(qty, accessToken, symbol, realTimeData);
        }
    };
}
export class Buy extends TradeElement {
    constructor(accessToken, symbol, realTimeData) {
        super(accessToken, symbol, realTimeData);
    }
    async handle() {
        const buy = config.status === "virtual" ? "VTTC0802U" : "TTTC0012U";
        const canBuy = await new CanBuy.Builder(this.accessToken, this.symbol, "01", "01", "N", "N")
            .build()
            .handle();
        //  await sleep(1000);
        const buyCount = Math.floor(Number(canBuy.nrcvb_buy_amt) / Number(this.realTimeData)) - 1;
        if (Number(canBuy.max_buy_qty) > 0 && buyCount !== 0) {
            await new TradingOrder.Builder(this.accessToken, buy, this.symbol, "01", String(buyCount), "0")
                .build()
                .handle();
            //   await Promise.all([
            //     setValue("buyPrice", String(this.realTimeData)),
            //     setValue("buyCount", String(buyCount)),
            //     setValue("sellPrice", String(Number(this.realTimeData) - 10)),
            //     setValue(
            //       "tradingTime",
            //       `${String(getTimeInterval(getTradingTime(), 5).index)}+buy`
            //     ),
            //   ]);
            //   await logInsert("매수", this.symbol, buyCount);
            //   await sendMail("TRADING_TRY", {
            //     symbolName: this.symbol,
            //     tradingCount: buyCount,
            //     type: "매수",
            //     date: getNowDate(),
            //     bPercent: this.strategyElement.bPercent,
            //     money: this.realTimeData,
            //     rsi: this.strategyElement.rsi,
            //   });
        }
    }
    static Builder = class BuyBuilder extends TradeBuilder {
        element;
        constructor(accessToken, symbol, realTimeData) {
            super();
            this.element = new Buy(accessToken, symbol, realTimeData);
        }
    };
}
