import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
import { logInsert } from "../db/insert.js";
import { getValue, setValue } from "../db/redisManager.js";
import sendMail from "../mail/sendMail.js";
import getNowDate from "../util/getNowDate.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
import isTradingAllowed from "../util/isTradeAllowed.js";
import { Behavior } from "./Behavior.js";

export interface SellBehavior extends Behavior {
  evaluate(): Promise<boolean>;
  action(): Promise<void>;
}

export class NPlusSellHahavior implements SellBehavior {
  static instance: NPlusSellHahavior;
  constructor(
    private currentHoldings: number,
    private price: number,
    private buyPrice: number,
    private accessToken: string,
    private qty: number,
    private bPercent: number
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

  async action(): Promise<void> {
    console.log(3);
    const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
    await new TradingOrder.Builder(
      this.accessToken,
      sell,
      config.symbolInverse as string,
      "01",
      String(this.qty),
      "0"
    )
      .build()
      .handle();
    // await setValue(
    //   "tradingTime",
    //   `${String(getTimeInterval(getTradingTime(), 5).index)}+sell`
    // ),
    // await logInsert("매도", config.symbolInverse as string, this.qty);
    // await sendMail("TRADING_TRY", {
    //   symbolName: config.symbolInverse as string,
    //   tradingCount: this.qty,
    //   type: "매도",
    //   date: getNowDate(),
    //   bPercent: this.bPercent,
    //   money: this.price,
    //   rsi: "알 필요 없음",
    // });
  }

  static getInstance(
    currentHoldings: number,
    price: number,
    buyPrice: number,
    accessToken: string,
    qty: number,
    bPercent: number
  ) {
    if (!this.instance) {
      return new NPlusSellHahavior(
        currentHoldings,
        price,
        buyPrice,
        accessToken,
        qty,
        bPercent
      );
    }
    return this.instance;
  }
}

export class UpDownSellHahavior implements SellBehavior {
  evaluate(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  action(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
