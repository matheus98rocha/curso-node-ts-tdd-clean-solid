import { EncrypterInterface } from "../../protocols/encrypter";
import { DbAddAccout } from "./db-add-account";

interface sutTypes {
  sut: DbAddAccout;
  encrypterStub: EncrypterInterface;
}

const makeEncrypter = (): EncrypterInterface => {
  class EncrypterStub implements EncrypterInterface {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  const encrypterStub = new EncrypterStub();
  return encrypterStub;
};

const makeSut = (): sutTypes => {
  const encrypterStub = makeEncrypter();
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
  test("Should throw if Encrypter throws", async () => {
    const { encrypterStub, sut } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email@mail.com ",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});
