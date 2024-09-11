import bcrypt from 'bcrypt'
import { NextFunction, Request } from 'express'
import jwt from 'jsonwebtoken'
import { AuthPayload, VandorPayload } from '../dto'
import { SECRET_KEY } from '../config'
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

export const ValidateSignature = async (req: Request, next: NextFunction) => {}
