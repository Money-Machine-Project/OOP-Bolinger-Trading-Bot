import { Service } from "typedi";
import isTradingAllowed from "../util/isTradeAllowed.js";

export interface TradingCondition {
  evaluate(): Promise<boolean>;
}

export class NPlusTradingCondition implements TradingCondition {
  static instance: NPlusTradingCondition;
  async evaluate(): Promise<boolean> {
    const [canSell, canBuy] = await Promise.all([
      isTradingAllowed("sell"),
      isTradingAllowed("buy"),
    ]);
    return canSell || canBuy;
  }
  static getInstance() {
    if (!this.instance) {
      return new NPlusTradingCondition();
    }
    return this.instance;
  }
}

class UpDownTradingCondition implements TradingCondition {
  static instance: UpDownTradingCondition;
  async evaluate(): Promise<boolean> {
    return false;
  }
  static getInstance() {
    if (!this.instance) {
      return new UpDownTradingCondition();
    }
    return this.instance;
  }
}
