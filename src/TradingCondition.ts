interface TradingCondition {
  evaluate(): boolean | Promise<boolean>;
}

class NPlusTradingCondition implements TradingCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}

class UpDownTradingCondition implements TradingCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}
