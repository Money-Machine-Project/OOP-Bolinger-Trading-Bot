import CanBuy from "./api/core/CanBuy.js";
import TradingOrder from "./api/core/TradingOrder.js";
import config from "./config/config.js";
import { logInsert } from "./db/insert.js";
import { setValue } from "./db/redisManager.js";
import sendMail from "./mail/sendMail.js";
import getNowDate from "./util/getNowDate.js";
import getTimeInterval from "./util/getTimeInterval.js";
import getTradingTime from "./util/getTradingTime.js";

export interface BuyAction {
  action(): Promise<void> | void;
}

export class NPlusBuyAction implements BuyAction {
  static instance: NPlusBuyAction;

  constructor(
    private accessToken: string,
    private price: number,
    private bPercent: number,
    private rsi: number
  ) {}

  async action(): Promise<void> {
    const buy = config.status === "virtual" ? "VTTC0802U" : "TTTC0012U";
    const canBuy = await new CanBuy.Builder(
      this.accessToken,
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
        this.accessToken,
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
      // await logInsert("매수",this.symbol, buyCount);
      // await sendMail("TRADING_TRY", {
      //   symbolName: this.symbol,
      //   tradingCount: buyCount,
      //   type: "매수",
      //   date: getNowDate(),
      //   bPercent: this.bPercent,
      //   money: this.price,
      //   rsi:this.rsi,
      // });
    }
  }

  static getInstance(
    accessToken: string,
    price: number,
    bPercent: number,
    rsi: number
  ) {
    if (!this.instance) {
      return new NPlusBuyAction(accessToken, price, bPercent, rsi);
    }
    return this.instance;
  }
}

class UpDownBuyAction implements BuyAction {
  static instance: UpDownBuyAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new UpDownBuyAction();
    }
    return this.instance;
  }
}
