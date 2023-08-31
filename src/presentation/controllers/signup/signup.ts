import {
  IHttpRequest,
  IHttpResponse,
  ControllerInterface,
  EmailValidatorInterface,
  AddAccountInterface,
} from "./signup-protocols";
import { InvalidParamError, MissingParamError } from "../../errors";
import {
  badRequest,
  serverError,
  sucessResponse,
} from "../../helpers/http-helper";

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
 async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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
      const addedAccount = await this.addAccount.add({
        name,
        email,
        password,
      });

      return sucessResponse(addedAccount);
    } catch (error) {
      return serverError();
    }
  }
}
