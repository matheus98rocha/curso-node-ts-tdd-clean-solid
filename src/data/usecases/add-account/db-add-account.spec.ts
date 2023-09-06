import { EncrypterInterface } from "../../protocols/encrypter";
import { DbAddAccout } from "./db-add-account";

interface sutTypes {
  sut: DbAddAccout;
  encrypterStub: EncrypterInterface;
}

const makeSut = (): sutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  const encrypterStub = new EncrypterStub();
  const sut = new DbAddAccout(encrypterStub);
  return { sut, encrypterStub };
};

describe("DbAddAccount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { encrypterStub, sut } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email@mail.com ",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });
});
