export class SignUpController {
  handle(httpRequest: any): any {
    const requiredFileds = ["name", "email"];
    for (const field of requiredFileds) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`),
        };
      }
    }
  }
}
