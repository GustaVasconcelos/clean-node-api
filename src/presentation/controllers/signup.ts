import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { type HttpResponse, type HttpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name || !httpRequest.body.email) {
      const missingParam = !httpRequest.body.name ? 'name' : 'email'
      return badRequest(new MissingParamError(missingParam))
    }

    return {
      statusCode: 200,
      body: { message: 'User successfully registered' }
    }
  }
}
