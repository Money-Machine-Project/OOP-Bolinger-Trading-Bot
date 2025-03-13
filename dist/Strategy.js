import { getArray, getValue } from "./db/redisManager.js";
import StockBalance from "./api/core/StockBalance.js";
import getBollingerBands from "./util/getBollingerBands.js";
import makeRsi from "./util/makeRsi.js";
import { NPlusNoTradeBehavior } from "./behavior/NoTradeBehavior.js";
import { NPlusCutBehavior } from "./behavior/CutBehavior.js";
import { NPlusSellHahavior } from "./behavior/SellHavior.js";
import { NPlusBuyBehavior } from "./behavior/BuyBehavior.js";
import sleep from "./util/sleep.js";
class Strategy {
    constructor() { }
    static getInstance() { }
}
export class NPusStrategy extends Strategy {
    static instance;
    async exe(price, accessToken) {
        console.log("NPlus 전략 시작");
        const [sellPrice, data, tradingTime, historicalData, buyPrice] = await Promise.all([
            getValue("sellPrice"),
            new StockBalance.Builder(accessToken).build().handle(),
            getValue("tradingTime"),
            getArray("inverseStockPrice"),
            getValue("buyPrice"),
        ]);
        const currentHoldings = data[0] ? data[0].hldg_qty : 0;
        const bollingerX2 = getBollingerBands(historicalData, price, 2);
        const rsi = makeRsi(historicalData, price, 5);
        console.log(bollingerX2, rsi);
        const nPlusSequence = [
            NPlusNoTradeBehavior.getInstance(tradingTime, accessToken),
            NPlusCutBehavior.getInstance(sellPrice, price, data),
            NPlusSellHahavior.getInstance(currentHoldings, price, buyPrice, accessToken, currentHoldings, bollingerX2.bPercent),
            NPlusBuyBehavior.getInstance(bollingerX2.bPercent, currentHoldings, rsi, price, accessToken),
        ];
        for (const element of nPlusSequence) {
            if (await element.evaluate()) {
                await sleep(2000);
                await element.action();
                break;
            }
        }
    }
    static getInstance() {
        if (!this.instance) {
            return new NPusStrategy();
        }
        return this.instance;
    }
}
export class UpDownStrategy extends Strategy {
    static instance;
    async exe() {
        console.log("UPDOWN 전략 시작");
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownStrategy();
        }
        return this.instance;
    }
}
