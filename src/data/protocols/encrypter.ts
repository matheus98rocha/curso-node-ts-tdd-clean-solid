export interface EncrypterInterface {
  encrypt(value: string): Promise<string>;
}
