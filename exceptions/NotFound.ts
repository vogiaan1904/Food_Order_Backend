import { ErrorCode } from './Constants'
import { HttpException } from './root'

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 404, null)
    }
}
