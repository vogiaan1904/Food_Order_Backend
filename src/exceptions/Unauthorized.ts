import { ErrorCode } from './Constants'
import { HttpException } from './Root'

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 401, null)
    }
}
