import isTradingAllowed from "../util/isTradeAllowed.js";
import { getValue } from "../db/redisManager.js";
export class NPlusCutCondition {
    sellPrice;
    price;
    data;
    static instance;
    constructor(sellPrice, price, data) {
        this.sellPrice = sellPrice;
        this.price = price;
        this.data = data;
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
    static getInstance(sellPrice, price, data) {
        if (!this.instance) {
            return new NPlusCutCondition(sellPrice, price, data);
        }
        return this.instance;
    }
}
class UpDownCutCondition {
    static instance;
    async evaluate() {
        return false;
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownCutCondition();
        }
        return this.instance;
    }
}
