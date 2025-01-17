import { type Controller, type HttpRequest, type HttpResponse } from '../../presentation/protocols'
import { type LogErrorRepository } from '../../data/protocols/log-error-repository'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly logErrorRepository: LogErrorRepository

  constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      const errorStack = String(httpResponse.body.stack || 'No stack trace available')
      await this.logErrorRepository.log(errorStack)
    }

    return httpResponse
  }
}
