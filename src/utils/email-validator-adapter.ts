import { EmailValidatorInterface } from "../presentation/protocols/email-validator.interface";
import validator from "validator";

export class EmailValidatorAdapter implements EmailValidatorInterface {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
