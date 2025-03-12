import isTradingAllowed from "./util/isTradeAllowed.js";

interface TradingCondition {
  evaluate(): boolean | Promise<boolean>;
}

class NPlusTradingCondition implements TradingCondition {
  async evaluate(): Promise<boolean> {
    const [canSell, canBuy] = await Promise.all([
      isTradingAllowed("sell"),
      isTradingAllowed("buy"),
    ]);
    return canSell || canBuy;
  }
}

class UpDownTradingCondition implements TradingCondition {
  evaluate(): boolean | Promise<boolean> {
    return false;
  }
}
