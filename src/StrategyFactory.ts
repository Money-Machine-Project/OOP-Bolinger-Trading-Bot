import { NPusStrategy, UpDownStrategy } from "./Strategy.js";

abstract class StrategyFactory {
  static createStrategy() {
    throw Error("하위 클래스에서 구현");
  }
}

export class NPusStrategyFactory extends StrategyFactory {
  static override createStrategy() {
    return NPusStrategy.getInstance();
  }
}

export class UpDownStrategyFactory extends StrategyFactory {
  static override createStrategy() {
    return UpDownStrategy.getInstance();
  }
}
