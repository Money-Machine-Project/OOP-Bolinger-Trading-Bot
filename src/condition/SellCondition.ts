import { Service } from "typedi";
import isTradingAllowed from "../util/isTradeAllowed.js";
import { getValue } from "../db/redisManager.js";

export interface SellCondition {
  evaluate(): Promise<boolean>;
}

export class NPlusSellCondition implements SellCondition {
  static instance: NPlusSellCondition;
  constructor(
    private currentHoldings: number,
    private price: number,
    private buyPrice: number
  ) {}
  async evaluate(): Promise<boolean> {
    const canSell = await isTradingAllowed("sell");
    if (
      canSell &&
      this.currentHoldings === Number(await getValue("buyCount")) &&
      this.price >= this.buyPrice + 5
    ) {
      return true;
    }
    return false;
  }
  static getInstance(currentHoldings: number, price: number, buyPrice: number) {
    if (!this.instance) {
      return new NPlusSellCondition(currentHoldings, price, buyPrice);
    }
    return this.instance;
  }
}

class UpDownSellCondition implements SellCondition {
  static instance: UpDownSellCondition;
  async evaluate(): Promise<boolean> {
    return false;
  }
  static getInstance() {
    if (!this.instance) {
      return new UpDownSellCondition();
    }
    return this.instance;
  }
}
