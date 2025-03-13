import { NPusStrategy, UpDownStrategy } from "./Strategy.js";
class StrategyFactory {
    static createStrategy() {
        throw Error("하위 클래스에서 구현");
    }
}
export class NPusStrategyFactory extends StrategyFactory {
    static createStrategy() {
        return NPusStrategy.getInstance();
        //   SubscriptionManager.getInstance().subscribe()
    }
}
export class UpDownStrategyFactory extends StrategyFactory {
    static createStrategy() {
        return UpDownStrategy.getInstance();
    }
}
