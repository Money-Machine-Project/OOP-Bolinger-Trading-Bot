import TradingOrder from "./api/core/TradingOrder.js";
import config from "./config/config.js";
import { logInsert } from "./db/insert.js";
import { setValue } from "./db/redisManager.js";
import sendMail from "./mail/sendMail.js";
import getTimeInterval from "./util/getTimeInterval.js";
import getTradingTime from "./util/getTradingTime.js";

export interface CutAction {
  action(): Promise<void> | void;
}

export class NPlusCutAction implements CutAction {
  static instance: NPlusCutAction;
  constructor(
    private accessToken: string,
    private data: any,
    private price: number,
    private sellPrice: number
  ) {}
  async action(): Promise<void> {
    const sell = config.status === "virtual" ? "VTTC0801U" : "TTTC0011U";
    await new TradingOrder.Builder(
      this.accessToken,
      sell,
      this.data.output1[0].pdno,
      "00",
      String(this.data.output1[0].hldg_qty),
      String(this.price)
    )
      .build()
      .handle();
    await setValue(
      "tradingTime",
      `${String(getTimeInterval(getTradingTime(), 5).index)}+cut`
    );
    await logInsert(
      "매도",
      this.data.output1[0].prdt_name,
      this.data.output1[0].hldg_qty
    );
    await sendMail("TRADING_CUT_OFF", {
      cutOffPrice: this.sellPrice,
      currentPrice: this.price,
      symbol: this.data.output1[0].prdt_name,
      tradingCount: this.data.output1[0].hldg_qty,
      money: this.price,
      type: "손절 매도",
    });
  }

  static getInstance(
    accessToken: string,
    data: any,
    price: number,
    sellPrice: number
  ) {
    if (!this.instance) {
      return new NPlusCutAction(accessToken, data, price, sellPrice);
    }
    return this.instance;
  }
}

class UpDownCutAction implements CutAction {
  static instance: UpDownCutAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new UpDownCutAction();
    }
    return this.instance;
  }
}
