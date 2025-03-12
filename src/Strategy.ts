import { SubscriptionManager } from "./SubscriptionManager.js";
import { getValue } from "./db/redisManager.js";
import StockBalance from "./api/core/StockBalance.js";
import { CutAction, NPlusCutAction } from "./CutAction.js";
import { CutCondition, NPlusCutCondition } from "./CutCondition.js";
import {
  NoTradingCondition,
  NPlusNoTradingCondition,
} from "./NoTradingCondition.js";
import { NPlusTradingAction, TradingAction } from "./TradingAction.js";
import { NPlusTradingCondition, TradingCondition } from "./TradingCondition.js";
import { NoTradingAction, NPlusNoTradingAction } from "./NoTradeAction.js";
import { Inject, Service } from "typedi";

interface Condition {
  noTradingCondition: NoTradingCondition;
  cutCondition: CutCondition;
  tradingCondition: TradingCondition;
}

interface Pair {
  condition: NoTradingCondition | CutCondition | TradingCondition;
  action: NoTradingAction | CutAction | TradingAction;
}

abstract class Strategy {
  abstract exe(price: number, accessToken: string): void;
  constructor() {}
  static getInstance() {}
}

export class NPusStrategy extends Strategy {
  private static instance: NPusStrategy;

  override async exe(price: number, accessToken: string) {
    console.log("NPlus 전략 시작");
    const [sellPrice, data, tradingTime] = await Promise.all([
      getValue("sellPrice"),
      new StockBalance.Builder(accessToken).build().handle(),
      getValue("tradingTime"),
    ]);
    const nPlusPair: Pair[] = [
      {
        condition: NPlusNoTradingCondition.getInstance(tradingTime),
        action: NPlusNoTradingAction.getInstance(),
      },
      {
        condition: NPlusCutCondition.getInstance(sellPrice, price, data),
        action: NPlusCutAction.getInstance(accessToken, data, price, sellPrice),
      },
      {
        condition: NPlusTradingCondition.getInstance(),
        action: NPlusTradingAction.getInstance(),
      },
    ];
    for (const pair of nPlusPair) {
      if (await pair.condition.evaluate()) {
        await pair.action.action();
        break;
      }
    }
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
