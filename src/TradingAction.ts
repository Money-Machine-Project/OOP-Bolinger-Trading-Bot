interface TradingAction {
  action(): Promise<void> | void;
}

class NPlusTradingAction implements TradingAction {
  async action(): Promise<void> {}
}

class UpDownTradingAction implements TradingAction {
  async action(): Promise<void> {}
}
