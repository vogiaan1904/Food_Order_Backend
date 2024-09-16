import bcrypt from 'bcrypt'
import { NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'
import { AuthPayload, VandorPayload } from '../dto'
import { SECRET_KEY } from '../config'
import { ErrorCode, UnauthorizedException } from '../exceptions'
import { CustomerRespository, VandorRepository } from '../repository'
export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return (await GeneratePassword(enteredPassword, salt)) === savedPassword
}

export const GenerateSignature = (payload: AuthPayload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '30m' })
}

export const ValidateSignature = async (req: Request) => {
    const signature = req.headers.authorization
    if (!signature) {
        throw new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED)
    }
    const payload = (await jwt.verify(signature.split(' ')[1], SECRET_KEY)) as AuthPayload
    if (payload.role === 'vendor') {
        const existingVandor = await VandorRepository.FindVandorById(payload._id)
        if (!existingVandor) {
            //might not necessary
            throw new UnauthorizedException('Vandor not exist', ErrorCode.UNAUTHORIZED)
        }
        ;(req as any).user = existingVandor
        return true
    } else if (payload.role === 'customer') {
        const existingCustomer = await CustomerRespository.FindCustomerById(payload._id)
        if (!existingCustomer) {
            //might not necessary
            throw new UnauthorizedException('Customer not exist', ErrorCode.UNAUTHORIZED)
        }
        ;(req as any).user = existingCustomer
        return true
    }
    return false
}
