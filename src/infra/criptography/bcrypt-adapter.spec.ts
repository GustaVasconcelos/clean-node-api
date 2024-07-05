import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('Bcrypt Adapter', () => {
  interface SutTypes {
    sut: BcryptAdapter
    salt: number
  }
  const makeSut = (): SutTypes => {
    const salt = 12
    const sut = new BcryptAdapter(salt)

    return {
      sut,
      salt
    }
  }
  test('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
