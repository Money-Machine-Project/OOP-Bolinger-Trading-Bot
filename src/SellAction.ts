export interface SellAction {
  action(): Promise<void> | void;
}

export class NPlusSellAction implements SellAction {
  static instance: NPlusSellAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new NPlusSellAction();
    }
    return this.instance;
  }
}

class UpDownSellAction implements SellAction {
  static instance: UpDownSellAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new UpDownSellAction();
    }
    return this.instance;
  }
}
