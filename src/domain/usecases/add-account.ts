import { AccountModelInterface } from "../models/account";

export interface AddAccountModelInterface {
  name: string;
  email: string;
  password: string;
}
export interface AddAccountInterface {
  add(account: AddAccountModelInterface): Promise<AccountModelInterface>;
}
