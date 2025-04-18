import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";
import axios from "axios";
import config from "../../config/config.js";

class TradingOrder extends OpenApi {
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
    super(accessToken);
    this.accessToken = accessToken;
    this.trId = trId;
    this.symbol = symbol;
    this.orderType = orderType;
    this.orderQuantity = orderQuantitiy;
    this.orderPrice = orderPrice;
  }
  override async handle() {
    console.log("TradingOrder Start");
    const path = "/uapi/domestic-stock/v1/trading/order-cash";
    const url = config.baseUrl + path;

    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${this.accessToken}`,
      appkey: config.appkey,
      appsecret: config.appsecret,
      tr_id: this.trId,
    };

    const data = {
      CANO: config.frontAccount,
      ACNT_PRDT_CD: config.backAccount,
      PDNO: this.symbol,
      ORD_DVSN: this.orderType,
      ORD_QTY: this.orderQuantity,
      ORD_UNPR: this.orderPrice,
    };

    const response = await axios.post(url, data, { headers });
    return response.data;
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
