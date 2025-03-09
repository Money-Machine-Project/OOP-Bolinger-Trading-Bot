import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class TradingSettlementDetail extends OpenApi {
  private today: string;
  private accessToken: string;
  private symbol: string;
  private type: string;
  private tradeComplete: string;
  private orderId?: string = "";
  private ctxAreaFK100?: string = "";
  private ctxAreaNk100?: string = "";

  constructor(
    today: string,
    accessToken: string,
    symbol: string,
    type: string,
    tradingComplete: string,
    orderId?: string,
    ctxAreaFK100?: string,
    ctxAreaNk100?: string
  ) {
    super();
    this.today = today;
    this.accessToken = accessToken;
    this.symbol = symbol;
    this.type = type;
    this.tradeComplete = tradingComplete;
    this.orderId = orderId;
    this.ctxAreaFK100 = ctxAreaFK100;
    this.ctxAreaNk100 = ctxAreaNk100;
  }
  override handle() {
    console.log("TradingSettlementDetail Start");
  }

  static Builder = class TradingSettlementDetailBuilder extends OpenApiBuilder {
    override openApi: TradingSettlementDetail;
    constructor(
      today: string,
      accessToken: string,
      symbol: string,
      type: string,
      tradingComplete: string
    ) {
      super();
      this.openApi = new TradingSettlementDetail(
        today,
        accessToken,
        symbol,
        type,
        tradingComplete
      );
    }

    setOrderId(orderId: string) {
      this.openApi.orderId = orderId;
      return this;
    }

    setCtxAreaFK100(ctxAreaFK100: string) {
      this.openApi.ctxAreaFK100 = ctxAreaFK100;
      return this;
    }

    setCtxAreaNk100(ctxAreaNk100: string) {
      this.openApi.ctxAreaNk100 = ctxAreaNk100;
      return this;
    }
  };
}

export default TradingSettlementDetail;
