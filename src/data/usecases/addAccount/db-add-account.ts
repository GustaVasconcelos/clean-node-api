import { type AccountModel } from '../../../domain/models/account'
import { type AddAccountModel, type AddAccount } from '../../../domain/usecases/add-account'
import { type Encrypter } from '../../protocols/encrypter'

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
