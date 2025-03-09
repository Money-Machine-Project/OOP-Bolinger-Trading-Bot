export abstract class Filter {
  next?: Filter;
  setNext(filter: Filter) {
    this.next = filter;
    return filter;
  }
  abstract handle(): Promise<void>;
}

export class DefaultFilter extends Filter {
  override async handle(): Promise<void> {
    if (this.next) {
      await this.next.handle();
    }
  }
}

export class NoTradeFilter extends Filter {
  override async handle(): Promise<void> {
    if (this.next) {
      await this.next.handle();
    }
  }
}

export class CutFilter extends Filter {
  override async handle(): Promise<void> {
    if (this.next) {
      await this.next.handle();
    }
  }
}

export class TradingFilter extends Filter {
  override async handle(): Promise<void> {
    if (this.next) {
      await this.next.handle();
    }
  }
}
