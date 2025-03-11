import {
  CutFilter,
  DefaultFilter,
  NoTradeFilter,
  TradingFilter,
} from "./filter/index.js";
import AccessToken from "./api/token/AccessToken.js";
import { Service, Container } from "typedi";
import { SubscriptionManager } from "./SubscriptionManager.js";
import { getArray } from "./db/redisManager.js";

abstract class Strategy {
  abstract exe(price: string, accessToken: string): void;
  constructor() {}
  static getInstance() {}
}

export class NPusStrategy extends Strategy {
  private static instance: NPusStrategy;

  override async exe(price: string, accessToken: string) {
    console.log("NPlus 전략 시작");
    const df = new DefaultFilter();
    let filter = df;
    if (true) {
      const ntf = new NoTradeFilter();
      filter = filter.setNext(ntf);
    }
    if (false && !(filter instanceof NoTradeFilter)) {
      const cf = new CutFilter();
      filter = filter.setNext(cf);
    }
    if (
      true &&
      !(filter instanceof NoTradeFilter) &&
      !(filter instanceof CutFilter)
    ) {
      const tf = new TradingFilter();
      filter = filter.setNext(tf);
    }
    await df.handle();
  }
  static override getInstance() {
    if (!this.instance) {
      return new NPusStrategy();
    }
    return this.instance;
  }
}

export class UpDownStrategy extends Strategy {
  private static instance: UpDownStrategy;
  override async exe() {
    console.log("UPDOWN 전략 시작");
  }

  static override getInstance() {
    if (!this.instance) {
      return new UpDownStrategy();
    }
    return this.instance;
  }
}
