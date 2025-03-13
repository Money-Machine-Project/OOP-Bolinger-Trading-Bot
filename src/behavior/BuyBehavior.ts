import CanBuy from "../api/core/CanBuy.js";
import TradingOrder from "../api/core/TradingOrder.js";
import config from "../config/config.js";
import { logInsert } from "../db/insert.js";
import { setValue } from "../db/redisManager.js";
import sendMail from "../mail/sendMail.js";
import getNowDate from "../util/getNowDate.js";
import getTimeInterval from "../util/getTimeInterval.js";
import getTradingTime from "../util/getTradingTime.js";
import isTradingAllowed from "../util/isTradeAllowed.js";
import { Behavior } from "./Behavior.js";

export interface BuyBehavior extends Behavior {
  evaluate(): Promise<boolean>;
  action(): Promise<void>;
}

export class NPlusBuyBehavior implements BuyBehavior {
  static instance: NPlusBuyBehavior;

  constructor(
    private bPercent: number,
    private currentHoldings: number,
    private rsi: number,
    private price: number,
    private accessToken: string
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

  async action(): Promise<void> {
    console.log(4);
    const buy = config.status === "virtual" ? "VTTC0802U" : "TTTC0012U";
    const canBuy = await new CanBuy.Builder(
      this.accessToken!,
      config.symbolInverse as string,
      "01",
      "01",
      "N",
      "N"
    )
      .build()
      .handle();
    //  await sleep(1000);
    const buyCount = Math.floor(Number(canBuy.nrcvb_buy_amt) / this.price) - 1;
    if (Number(canBuy.max_buy_qty) > 0 && buyCount !== 0) {
      await new TradingOrder.Builder(
        this.accessToken!,
        buy,
        config.symbolInverse as string,
        "01",
        String(buyCount),
        "0"
      )
        .build()
        .handle();
      // await Promise.all([
      //   setValue("buyPrice", String(this.price)),
      //   setValue("buyCount", String(buyCount)),
      //   setValue("sellPrice", String(Number(this.price) - 10)),
      //   setValue(
      //     "tradingTime",
      //     `${String(getTimeInterval(getTradingTime(), 5).index)}+buy`
      //   ),
      // ]);
      // await logInsert("매수", config.symbolInverse as string, buyCount);
      // await sendMail("TRADING_TRY", {
      //   symbolName: config.symbolInverse as string,
      //   tradingCount: buyCount,
      //   type: "매수",
      //   date: getNowDate(),
      //   bPercent: this.bPercent,
      //   money: this.price,
      //   rsi: this.rsi,
      // });
    }
  }
  static getInstance(
    bPercent: number,
    currentHoldings: number,
    rsi: number,
    price: number,
    accessToken: string
  ) {
    if (!this.instance) {
      return new NPlusBuyBehavior(
        bPercent,
        currentHoldings,
        rsi,
        price,
        accessToken
      );
    }
    return this.instance;
  }
}

export class UpDownBuyBehavior implements BuyBehavior {
  evaluate(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  action(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
