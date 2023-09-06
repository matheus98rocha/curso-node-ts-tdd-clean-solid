import { AccountModelInterface } from "../../../domain/models/account";
import {
  AddAccountInterface,
  AddAccountModelInterface,
} from "../../../domain/usecases/add-account";
import { EncrypterInterface } from "../../protocols/encrypter";

export class DbAddAccout implements AddAccountInterface {
  private readonly encrypter: EncrypterInterface;
  constructor(encrypter: EncrypterInterface) {
    this.encrypter = encrypter;
  }
  async add(account: AddAccountModelInterface): Promise<AccountModelInterface> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) =>
      resolve({
        id: "id_valid",
        name: "user_name",
        email: "user_email@mail.com",
        password: "valid_password",
      })
    );
  }
}
