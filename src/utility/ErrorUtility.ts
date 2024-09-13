import e, { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/Root'
import { InternalException } from '../exceptions/Internal'
import { ErrorCode } from '../exceptions/Constants'
import { ZodError } from 'zod'
import { BadRequestsException } from '../exceptions'

export const ErrorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException
            if (error instanceof HttpException) {
                exception = error
            } else {
                if (error instanceof ZodError) {
                    exception = new BadRequestsException('Invalid inputs', ErrorCode.UNPROCESSABLE_ENTITY, error)
                } else {
                    exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION)
                }
            }
            next(exception)
        }
    }
}
