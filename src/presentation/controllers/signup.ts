import { IHttpRequest, IHttpResponse, ControllerInterface } from "../protocols";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import { EmailValidatorInterface } from "../protocols/email-validator.interface";
import { AddAccountInterface } from "../../domain/usecases/add-account";

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidatorInterface;
  private readonly addAccount: AddAccountInterface;

  constructor(
    emailValidator: EmailValidatorInterface,
    addAccount: AddAccountInterface
  ) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }
  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError("passwordConfirmation"));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      // If all required fields are present, you need to provide a response
      this.addAccount.add({
        name,
        email,
        password,
      });

      return {
        statusCode: 200,
        body: "Success",
      };
    } catch (error) {
      return serverError();
    }
  }
}
