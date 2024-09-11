import { ErrorCode } from './Constants'
import { HttpException } from './Root'

export class InternalException extends HttpException {
    constructor(message: string, errors: any, errorCode: ErrorCode) {
        super(message, errorCode, 500, errors)
    }
}
