import checkTradingTimeExceed from "../util/checkTradingTimeExceed.js";
export class NPlusNoTradingCondition {
    tradingTime;
    static instance;
    constructor(tradingTime) {
        this.tradingTime = tradingTime;
    }
    async evaluate() {
        if (this.tradingTime !== null &&
            (this.tradingTime.split("+")[1] === "sell" ||
                this.tradingTime.split("+")[1] === "buy") &&
            checkTradingTimeExceed(this.tradingTime.split("+")[0])) {
            return true;
        }
        return false;
    }
    static getInstance(tradingTime) {
        if (!this.instance) {
            return new NPlusNoTradingCondition(tradingTime);
        }
        return this.instance;
    }
}
class UpDownNoTradingCondition {
    static instance;
    async evaluate() {
        return false;
    }
    static getInstance() {
        if (!this.instance) {
            return new UpDownNoTradingCondition();
        }
        return this.instance;
    }
}
