import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class RetradingOrder extends OpenApi {
  private accessToken: string;
  private orderId: string;
  private tradingType: string;
  private count: string;
  private price: string;
  constructor(
    accessToken: string,
    orderId: string,
    tradingType: string,
    count: string,
    price: string
  ) {
    super();
    this.accessToken = accessToken;
    this.orderId = orderId;
    this.tradingType = tradingType;
    this.count = count;
    this.price = price;
  }
  override handle() {
    console.log("RetradingOrder Start");
  }

  static Builder = class RetradingOrderBuilder extends OpenApiBuilder {
    override openApi: RetradingOrder;
    constructor(
      accessToken: string,
      orderId: string,
      tradingType: string,
      count: string,
      price: string
    ) {
      super();
      this.openApi = new RetradingOrder(
        accessToken,
        orderId,
        tradingType,
        count,
        price
      );
    }
  };
}

export default RetradingOrder;
