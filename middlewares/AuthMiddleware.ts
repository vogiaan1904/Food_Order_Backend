import { NextFunction, Request, Response } from 'express'
import { ErrorCode, UnauthorizedException } from '../exceptions'
import { FindVandor } from '../controllers'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'
import { AuthPayload } from '../dto/Auth.dto'

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers.authorization
    if (!signature) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        return
    }

    try {
        const payload = (await jwt.verify(signature.split(' ')[1], SECRET_KEY)) as AuthPayload
        const existingVandor = await FindVandor(payload._id)
        if (!existingVandor) {
            next(new UnauthorizedException('Vandor not exist', ErrorCode.UNAUTHORIZED))
        }
        ;(req as any).user = existingVandor
        next()
        return
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        } else if (error.name === 'TokenExpiredError') {
            next(new UnauthorizedException('Token expired', ErrorCode.UNAUTHORIZED))
        } else {
            next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }
    }
}
