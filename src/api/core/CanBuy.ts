import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class CanBuy extends OpenApi {
  private accessToken: string;
  private symbol: string;
  private unpr: string;
  private dvsn: string;
  private icld: string;

  private constructor(
    accessToken: string,
    symbol: string,
    unpr: string,
    dvsn: string,
    icld: string
  ) {
    super();
    this.accessToken = accessToken;
    this.symbol = symbol;
    this.unpr = unpr;
    this.dvsn = dvsn;
    this.icld = icld;
  }
  override handle() {
    console.log("canBuy Start");
  }

  static Builder = class CanBuyBuilder extends OpenApiBuilder {
    override openApi: CanBuy;
    constructor(
      accessToken: string,
      symbol: string,
      unpr: string,
      dvsn: string,
      icld: string
    ) {
      super();
      this.openApi = new CanBuy(accessToken, symbol, unpr, dvsn, icld);
    }
  };
}

export default CanBuy;
