import OpenApi from "./OpenApi.js";

abstract class OpenApiBuilder {
  public openApi!: OpenApi;
  constructor() {}
  build() {
    return this.openApi;
  }
}

export default OpenApiBuilder;
