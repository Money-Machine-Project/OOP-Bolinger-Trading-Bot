interface NoTradingAction {
  action(): Promise<void> | void;
}

class NPlusNoTradingAction implements NoTradingAction {
  async action(): Promise<void> {}
}

class UpDownNoTradingAction implements NoTradingAction {
  async action(): Promise<void> {}
}
