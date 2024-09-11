import { ErrorCode } from './Constants'
import { HttpException } from './Root'

export class BadRequestsException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors?: any) {
        super(message, errorCode, 400, errors)
    }
}
