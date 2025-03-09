import {
  CutFilter,
  DefaultFilter,
  NoTradeFilter,
  TradingFilter,
} from "./filter/index.js";
import CanBuy from "./api/core/CanBuy.js";
import StockBalance from "./api/core/StockBalance.js";
import AccessToken from "./api/core/AccessToken.js";
import RetradingOrder from "./api/core/RetradingOrder.js";
import TradingOrder from "./api/core/TradingOrder.js";
import TradingSettlementDetail from "./api/core/TradingSettlementDetail.js";
import StockTimeSeriesPrice from "./api/core/StockTimeSeriesPrice.js";

abstract class Strategy {
  abstract exe(): void;
  static getInstance() {}
}

export class NPusStrategy extends Strategy {
  private static instance: NPusStrategy;
  override async exe() {
    console.log("NPlus 전략 시작");
    const df = new DefaultFilter();
    let filter = df;
    if (false) {
      const ntf = new NoTradeFilter();
      filter = filter.setNext(ntf);
    }
    if (false) {
      const cf = new CutFilter();
      filter = filter.setNext(cf);
    }
    if (true) {
      const tf = new TradingFilter();
      filter = filter.setNext(tf);
    }
    await df.handle();
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
  override async exe() {
    console.log("UPDOWN 전략 시작");
  }
  static override getInstance() {
    if (!this.instance) {
      return new UpDownStrategy();
    }
    return this.instance;
  }
}
