export class ServerError extends Error {
  constructor() {
    super(`Internal server error - Status Code:${500}`);
    this.name = "ServerError";
  }
}
