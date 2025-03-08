abstract class Strategy {
  abstract exe(): void;
  static getInstance() {}
}

export class NPusStrategy extends Strategy {
  private static instance: NPusStrategy;
  override exe(): void {
    console.log("NPlus 전략 시작");
  }
  static override getInstance() {
    if (!this.instance) {
      return new NPusStrategy();
    }
    return this.instance;
  }
}

export class UpDownStrategy extends Strategy {
  private static instance: UpDownStrategy;
  override exe(): void {
    console.log("UPDOWN 전략 시작");
  }
  static override getInstance() {
    if (!this.instance) {
      return new UpDownStrategy();
    }
    return this.instance;
  }
}
