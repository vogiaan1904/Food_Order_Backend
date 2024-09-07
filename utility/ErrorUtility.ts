import e, { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/root'
import { InternalException } from '../exceptions/Internal'
import { ErrorCode } from '../exceptions/Constants'

export const ErrorHandler = (method: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            method(req, res, next)
        } catch (error: any) {
            let exception: HttpException
            if (error instanceof HttpException) {
                exception = error
            } else {
                exception = new InternalException(
                    'Something went wrong!',
                    error,
                    ErrorCode.UNAUTHORIZED
                )
            }
            next(exception)
        }
    }
}
