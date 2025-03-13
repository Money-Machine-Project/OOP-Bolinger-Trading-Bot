import { getArray, getValue } from "./db/redisManager.js";
import StockBalance from "./api/core/StockBalance.js";
import { NPlusCutCondition } from "./condition/CutCondition.js";
import { NPlusBuyCondition } from "./condition/BuyCondition.js";
import getBollingerBands from "./util/getBollingerBands.js";
import makeRsi from "./util/makeRsi.js";
import { NPlusNoTradingCondition, } from "./condition/NoTradingCondition.js";
import { NPlusSellCondition, } from "./condition/SellCondition.js";
import { NPlusNoTradingAction, } from "./action/NoTradeAction.js";
import { NPlusCutAction } from "./action/CutAction.js";
import { NPlusSellAction } from "./action/SellAction.js";
import { NPlusBuyAction } from "./action/BuyAction.js";
class Strategy {
    constructor() { }
    static getInstance() { }
}
export class NPusStrategy extends Strategy {
    static instance;
    async exe(price, accessToken) {
        console.log("NPlus 전략 시작");
        const [sellPrice, data, tradingTime] = await Promise.all([
            getValue("sellPrice"),
            new StockBalance.Builder(accessToken).build().handle(),
            getValue("tradingTime"),
        ]);
        const currentHoldings = data[0] ? data[0].hldg_qty : 0;
        const buyPrice = await getValue("buyPrice");
        const historicalData = await getArray("inverseStockPrice");
        const bollingerX2 = getBollingerBands(historicalData, price, 2);
        const rsi = makeRsi(historicalData, price, 5);
        const nPlusPair = [
            {
                condition: NPlusNoTradingCondition.getInstance(tradingTime),
                action: NPlusNoTradingAction.getInstance(),
            },
            {
                condition: NPlusCutCondition.getInstance(sellPrice, price, data),
                action: NPlusCutAction.getInstance(accessToken, data, price, sellPrice),
            },
            {
                condition: NPlusSellCondition.getInstance(currentHoldings, price, buyPrice),
                action: NPlusSellAction.getInstance(accessToken, currentHoldings, bollingerX2.bPercent, price),
            },
            {
                condition: NPlusBuyCondition.getInstance(bollingerX2.bPercent, currentHoldings, rsi, price),
                action: NPlusBuyAction.getInstance(accessToken, price, bollingerX2.bPercent, rsi),
            },
        ];
        for (const pair of nPlusPair) {
            if (await pair.condition.evaluate()) {
                await pair.action.action();
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
