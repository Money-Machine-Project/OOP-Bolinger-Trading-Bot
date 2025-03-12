import checkTradingTimeExceed from "./util/checkTradingTimeExceed.js";

interface NoTradingCondition {
  evaluate(): boolean | Promise<boolean>;
}

class NPlusNoTradingCondition implements NoTradingCondition {
  constructor(private tradingTime: string) {}
  evaluate(): boolean | Promise<boolean> {
    if (
      this.tradingTime !== null &&
      (this.tradingTime.split("+")[1] === "sell" ||
        this.tradingTime.split("+")[1] === "buy") &&
      checkTradingTimeExceed(this.tradingTime.split("+")[0])
    ) {
      return true;
    }
    return false;
  }
}

class UpDownNoTradingCondition implements NoTradingCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}
