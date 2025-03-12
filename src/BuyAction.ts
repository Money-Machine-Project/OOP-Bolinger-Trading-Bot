export interface BuyAction {
  action(): Promise<void> | void;
}

export class NPlusBuyAction implements BuyAction {
  static instance: NPlusBuyAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new NPlusBuyAction();
    }
    return this.instance;
  }
}

class UpDownBuyAction implements BuyAction {
  static instance: UpDownBuyAction;
  async action(): Promise<void> {}
  static getInstance() {
    if (!this.instance) {
      return new UpDownBuyAction();
    }
    return this.instance;
  }
}
