abstract class OpenApi {
  public accessToken?: string;
  constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }
  abstract handle(): any;
}

export default OpenApi;
