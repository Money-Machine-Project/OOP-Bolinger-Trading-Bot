import { Service } from "typedi";
import isTradingAllowed from "../util/isTradeAllowed.js";

export interface BuyCondition {
  evaluate(): Promise<boolean>;
}

export class NPlusBuyCondition implements BuyCondition {
  static instance: NPlusBuyCondition;

  constructor(
    private bPercent: number,
    private currentHoldings: number,
    private rsi: number,
    private price: number
  ) {}
  async evaluate(): Promise<boolean> {
    const canBuy = await isTradingAllowed("buy");
    if (
      canBuy &&
      0.3 >= this.bPercent &&
      this.currentHoldings === 0 &&
      this.rsi <= 50 &&
      Math.floor(this.price) % 5 === 0
    ) {
      return true;
    }
    return false;
  }

  static getInstance(
    bPercent: number,
    currentHoldings: number,
    rsi: number,
    price: number
  ) {
    if (!this.instance) {
      return new NPlusBuyCondition(bPercent, currentHoldings, rsi, price);
    }
    return this.instance;
  }
}

class UpDownBuyCondition implements BuyCondition {
  static instance: UpDownBuyCondition;
  async evaluate(): Promise<boolean> {
    return false;
  }
  static getInstance() {
    if (!this.instance) {
      return new UpDownBuyCondition();
    }
    return this.instance;
  }
}
