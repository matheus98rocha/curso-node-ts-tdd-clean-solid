import { EmailValidatorInterface } from "../presentation/protocols/email-validator.interface";

export class EmailValidatorAdapter implements EmailValidatorInterface {
  isValid(email: string): boolean {
    return false;
  }
}
