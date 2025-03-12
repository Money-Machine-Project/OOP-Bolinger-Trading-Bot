import { Service } from "typedi";
import checkTradingTimeExceed from "./util/checkTradingTimeExceed.js";

export interface NoTradingCondition {
  evaluate(): Promise<boolean>;
}

export class NPlusNoTradingCondition implements NoTradingCondition {
  static instance: NPlusNoTradingCondition;
  constructor(private tradingTime: string) {}
  async evaluate(): Promise<boolean> {
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
  static getInstance(tradingTime: string) {
    if (!this.instance) {
      return new NPlusNoTradingCondition(tradingTime);
    }
    return this.instance;
  }
}

class UpDownNoTradingCondition implements NoTradingCondition {
  static instance: NPlusNoTradingCondition;
  async evaluate(): Promise<boolean> {
    return false;
  }
  static getInstance() {
    if (!this.instance) {
      return new UpDownNoTradingCondition();
    }
    return this.instance;
  }
}
