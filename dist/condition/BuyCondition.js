import isTradingAllowed from "../util/isTradeAllowed.js";
export class NPlusBuyCondition {
    bPercent;
    currentHoldings;
    rsi;
    price;
    static instance;
    constructor(bPercent, currentHoldings, rsi, price) {
        this.bPercent = bPercent;
        this.currentHoldings = currentHoldings;
        this.rsi = rsi;
        this.price = price;
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
    static getInstance(bPercent, currentHoldings, rsi, price) {
        if (!this.instance) {
            return new NPlusBuyCondition(bPercent, currentHoldings, rsi, price);
        }
        return this.instance;
    }
}
class UpDownBuyCondition {
    static instance;
    async evaluate() {
        return false;
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownBuyCondition();
        }
        return this.instance;
    }
}
