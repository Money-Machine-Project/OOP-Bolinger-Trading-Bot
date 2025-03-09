import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class TradingOrder extends OpenApi {
  private accessToken: string;
  private trId: string;
  private symbol: string;
  private orderType: string;
  private orderQuantity: string;
  private orderPrice: string;
  constructor(
    accessToken: string,
    trId: string,
    symbol: string,
    orderType: string,
    orderQuantitiy: string,
    orderPrice: string
  ) {
    super();
    this.accessToken = accessToken;
    this.trId = trId;
    this.symbol = symbol;
    this.orderType = orderType;
    this.orderQuantity = orderQuantitiy;
    this.orderPrice = orderPrice;
  }
  override handle() {
    console.log("TradingOrder Start");
  }

  static Builder = class TradingOrderBuilder extends OpenApiBuilder {
    override openApi: TradingOrder;
    constructor(
      accessToken: string,
      trId: string,
      symbol: string,
      orderType: string,
      orderQuantitiy: string,
      orderPrice: string
    ) {
      super();
      this.openApi = new TradingOrder(
        accessToken,
        trId,
        symbol,
        orderType,
        orderQuantitiy,
        orderPrice
      );
    }
  };
}

export default TradingOrder;
