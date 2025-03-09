import OpenApi from "../OpenApi.js";
import OpenApiBuilder from "../OpenApiBuilder.js";

class StockTimeSeriesPrice extends OpenApi {
  private accessToken: string;
  private symbol: string;
  constructor(accessToken: string, symbol: string) {
    super();
    this.accessToken = accessToken;
    this.symbol = symbol;
  }
  override handle() {
    console.log("StockTimeSeriesPrice Start");
  }

  static Builder = class StockTimeSeriesPriceBuilder extends OpenApiBuilder {
    override openApi: StockTimeSeriesPrice;
    constructor(accessToken: string, symbol: string) {
      super();
      this.openApi = new StockTimeSeriesPrice(accessToken, symbol);
    }
  };
}

export default StockTimeSeriesPrice;
