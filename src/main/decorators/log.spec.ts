import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe(('LogController Decorator'), () => {
  class ControllerStub implements Controller {
    async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          id: 'valid_id',
          name: 'any_name',
          email: 'any_mail@email.com',
          password: 'hashed_password'
        }
      }
      return await new Promise((resolve => { resolve(httpResponse) }))
    }
  }

  interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: ControllerStub
  }

  const makeSut = (): SutTypes => {
    const controllerStub = new ControllerStub()
    const sut = new LogControllerDecorator(controllerStub)

    return {
      sut,
      controllerStub
    }
  }

  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any_mail@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
