import isTradingAllowed from "../util/isTradeAllowed.js";
import { getValue } from "../db/redisManager.js";
export class NPlusSellCondition {
    currentHoldings;
    price;
    buyPrice;
    static instance;
    constructor(currentHoldings, price, buyPrice) {
        this.currentHoldings = currentHoldings;
        this.price = price;
        this.buyPrice = buyPrice;
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
    static getInstance(currentHoldings, price, buyPrice) {
        if (!this.instance) {
            return new NPlusSellCondition(currentHoldings, price, buyPrice);
        }
        return this.instance;
    }
}
class UpDownSellCondition {
    static instance;
    async evaluate() {
        return false;
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownSellCondition();
        }
        return this.instance;
    }
}
