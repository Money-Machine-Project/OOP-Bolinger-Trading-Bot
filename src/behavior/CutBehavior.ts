import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
import { logInsert } from "../db/insert.js";
import { getValue, setValue } from "../db/redisManager.js";
import sendMail from "../mail/sendMail.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
import isTradingAllowed from "../util/isTradeAllowed.js";
import { Behavior } from "./Behavior.js";

export interface CutBehavior extends Behavior {
  evaluate(): Promise<boolean>;
  action(): Promise<void>;
}

export class NPlusCutBehavior implements CutBehavior {
  static instance: NPlusCutBehavior;
  constructor(
    private sellPrice: number,
    private price: number,
    private data: any,
    private accessToken?: string
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

  async action(): Promise<void> {
    console.log(2);
    const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
    await new TradingOrder.Builder(
      this.accessToken!,
      sell,
      this.data.output1[0].pdno,
      "00",
      String(this.data.output1[0].hldg_qty),
      String(this.price)
    )
      .build()
      .handle();
    // await setValue(
    //   "tradingTime",
    //   `${String(getTimeInterval(getTradingTime(), 5).index)}+cut`
    // );
    // await logInsert(
    //   "매도",
    //   this.data.output1[0].prdt_name,
    //   this.data.output1[0].hldg_qty
    // );
    // await sendMail("TRADING_CUT_OFF", {
    //   cutOffPrice: this.sellPrice,
    //   currentPrice: this.price,
    //   symbol: this.data.output1[0].prdt_name,
    //   tradingCount: this.data.output1[0].hldg_qty,
    //   money: this.price,
    //   type: "손절 매도",
    // });
  }

  static getInstance(sellPrice: number, price: number, data: any) {
    if (!this.instance) {
      return new NPlusCutBehavior(sellPrice, price, data);
    }
    return this.instance;
  }
}

export class UpDownCutBehavior implements CutBehavior {
  evaluate(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  action(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
