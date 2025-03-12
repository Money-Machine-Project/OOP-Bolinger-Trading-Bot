import { getValue } from "../db/redisManager.js";
import checkTradingTimeExceed from "../util/checkTradingTimeExceed.js";

interface Condition {
  evalueate(): boolean | Promise<boolean>;
}

class NoTradeCondition implements Condition {
  constructor(private tradingTime: string) {}
  evalueate(): boolean {
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

class CutOffCondition implements Condition {
  constructor(
    private canCutOff: boolean,
    private sellPrice: number,
    private price: number,
    private data: any
  ) {}
  async evalueate(): Promise<boolean> {
    if (
      this.canCutOff &&
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

class TradingCondition implements Condition {
  constructor(private canSell: boolean, private canBuy: boolean) {}
  evalueate(): boolean | Promise<boolean> {
    return this.canSell || this.canBuy;
  }
}
