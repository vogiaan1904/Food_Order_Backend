import { NextFunction, Request, Response } from 'express'
import { ErrorCode, UnauthorizedException } from '../exceptions'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config'
import { AuthPayload } from '../dto/Auth.dto'
import { VandorService } from '../services'
import { VandorRepository } from '../repository'

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers.authorization
    if (!signature) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        return
    }

    try {
        const payload = (await jwt.verify(signature.split(' ')[1], SECRET_KEY)) as AuthPayload
        const existingVandor = await VandorRepository.FindVandorById(payload._id)
        if (!existingVandor) {
            //might not necessary
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
