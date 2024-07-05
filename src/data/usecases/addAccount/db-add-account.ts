import { type AccountModel, type AddAccountModel, type AddAccount, type Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly enctryper: Encrypter

  constructor (encrypter: Encrypter) {
    this.enctryper = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.enctryper.encrypt(account.password)

    const accountValid = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    return await new Promise(resolve => { resolve(accountValid) })
  }
}
