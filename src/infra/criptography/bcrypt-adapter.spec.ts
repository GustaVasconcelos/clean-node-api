/* eslint-disable @typescript-eslint/no-misused-promises */
import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve) => { resolve('hash') })
  }
}))

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

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => { await Promise.reject(new Error()) })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
