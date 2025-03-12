import { getValue } from "./db/redisManager.js";
import isTradingAllowed from "./util/isTradeAllowed.js";

interface CutCondition {
  evaluate(): boolean | Promise<boolean>;
}

class NPlusCutCondition implements CutCondition {
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
}

class UpDownCutCondition implements CutCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}
