import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { VandorPayload } from '../dto'
import { SECRET_KEY } from '../config'
import { Request } from 'express'
import { AuthPayload } from '../dto/Auth.dto'
import { UnauthorizedException } from '../exceptions/Unauthorized'
import { ErrorCode } from '../exceptions/Constants'
import { FindVandor } from '../controllers'
export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
) => {
    return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateSignature = (payload: VandorPayload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '30m' })
}

export const ValidateSignature = async (req: Request) => {
    const signature = req.headers.authorization
    if (!signature) {
        throw new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED)
    }

    const payload = (await jwt.verify(signature.split(' ')[1], SECRET_KEY)) as AuthPayload
    const existingVandor = await FindVandor(payload._id)
    if (!existingVandor) {
        throw new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED)
    }
    ;(req as any).user = existingVandor
    try {
    } catch (error) {}

    return false
}
