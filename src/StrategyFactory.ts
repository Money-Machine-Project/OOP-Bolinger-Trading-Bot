import { NPusStrategy, UpDownStrategy } from "./Strategy.js";
import { SubscriptionManager } from "./SubscriptionManager.js";

abstract class StrategyFactory {
  static createStrategy() {
    throw Error("하위 클래스에서 구현");
  }
}

export class NPusStrategyFactory extends StrategyFactory {
  static override createStrategy() {
    return NPusStrategy.getInstance();
    //   SubscriptionManager.getInstance().subscribe()
  }
}

export class UpDownStrategyFactory extends StrategyFactory {
  static override createStrategy() {
    return UpDownStrategy.getInstance();
  }
}
