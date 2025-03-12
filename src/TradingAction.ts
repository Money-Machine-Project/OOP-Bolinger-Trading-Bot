export interface TradingAction {
  action(): Promise<void> | void;
}

export class NPlusTradingAction implements TradingAction {
  static instance: NPlusTradingAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new NPlusTradingAction();
    }
    return this.instance;
  }
}

class UpDownTradingAction implements TradingAction {
  static instance: UpDownTradingAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new UpDownTradingAction();
    }
    return this.instance;
  }
}
