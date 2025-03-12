interface NoTradingCondition {
  evaluate(): boolean | Promise<boolean>;
}

class NPlusNoTradingCondition implements NoTradingCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}

class UpDownNoTradingCondition implements NoTradingCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}
