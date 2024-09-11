import { ErrorCode } from './Constants'
import { HttpException } from './Root'

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 404, null)
    }
}
