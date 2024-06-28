import { type HttpResponse, type HttpRequest } from '../../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name || !httpRequest.body.email) {
      const missingParam = !httpRequest.body.name ? 'name' : 'email'
      return {
        statusCode: 400,
        body: { error: `Missing param: ${missingParam}` }
      }
    }

    return {
      statusCode: 200,
      body: { message: 'User successfully registered' }
    }
  }
}
