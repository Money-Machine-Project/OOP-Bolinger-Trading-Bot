import { Service } from "typedi";
import { getValue } from "./db/redisManager.js";
import isTradingAllowed from "./util/isTradeAllowed.js";

export interface CutCondition {
  evaluate(): Promise<boolean>;
}

export class NPlusCutCondition implements CutCondition {
  static instance: NPlusCutCondition;
  constructor(
    private sellPrice: number,
    private price: number,
    private data: any
  ) {}
  async evaluate(): Promise<boolean> {
    const canCutOff = await isTradingAllowed("cut");
    if (
      canCutOff &&
      this.sellPrice !== null &&
      this.sellPrice > this.price &&
      Number(this.data.output1[0].hldg_qty) ===
        Number(await getValue("buyCount"))
    ) {
      return true;
    }
    return false;
  }

  static getInstance(sellPrice: number, price: number, data: any) {
    if (!this.instance) {
      return new NPlusCutCondition(sellPrice, price, data);
    }
    return this.instance;
  }
}

class UpDownCutCondition implements CutCondition {
  static instance: UpDownCutCondition;
  async evaluate(): Promise<boolean> {
    return false;
  }
  static getInstance() {
    if (!this.instance) {
      return new UpDownCutCondition();
    }
    return this.instance;
  }
}
