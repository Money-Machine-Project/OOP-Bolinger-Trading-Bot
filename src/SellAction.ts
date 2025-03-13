import TradingOrder from "./api/core/TradingOrder.js";
import config from "./config/config.js";
import { logInsert } from "./db/insert.js";
import { setValue } from "./db/redisManager.js";
import sendMail from "./mail/sendMail.js";
import getNowDate from "./util/getNowDate.js";
import getTimeInterval from "./util/getTimeInterval.js";
import getTradingTime from "./util/getTradingTime.js";

export interface SellAction {
  action(): Promise<void> | void;
}

export class NPlusSellAction implements SellAction {
  static instance: NPlusSellAction;

  constructor(
    private accessToken: string,
    private qty: number,
    private bPercent: number,
    private price: number
  ) {}

  async action(): Promise<void> {
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
    // await logInsert("매도", this.symbol, this.qty);
    // await sendMail("TRADING_TRY", {
    //   symbolName: this.symbol,
    //   tradingCount: this.qty,
    //   type: "매도",
    //   date: getNowDate(),
    //   bPercent: this.bPercent,
    //   money: this.price,
    //   rsi:"알 필요 없음",
    // });
  }
  static getInstance(
    accessToken: string,
    qty: number,
    bPercent: number,
    price: number
  ) {
    if (!this.instance) {
      return new NPlusSellAction(accessToken, qty, bPercent, price);
    }
    return this.instance;
  }
}

class UpDownSellAction implements SellAction {
  static instance: UpDownSellAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new UpDownSellAction();
    }
    return this.instance;
  }
}
