import { NextFunction, Request, Response } from 'express'
import { ValidateSignature } from '../utility'

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSignature(req)

    if (validate) {
        next()
    } else {
        return res.json({ message: 'user not Authorized' })
    }
}
