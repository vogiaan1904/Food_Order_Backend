import { NextFunction, Request, Response } from 'express'
import { VandorLoginInput } from '../dto'
import { FindVandor } from './AdminController'
import { GenerateSignature, ValidatePassword } from '../utility'
import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInput>req.body

    const existingVandor = await FindVandor('', email)

    if (existingVandor === null) {
        throw new NotFoundException('Vandor with email not found', ErrorCode.USER_NOT_FOUND)
    }
    const validation = await ValidatePassword(
        password,
        existingVandor.password,
        existingVandor.salt
    )
    if (validation) {
        const signature = GenerateSignature({
            _id: existingVandor.id,
            email: existingVandor.email,
            foodType: existingVandor.foodType,
            name: existingVandor.name,
        })

        return res.json(signature)
    } else {
        throw new BadRequestsException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD)
    }
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    if (user) {
        const existingVandor = await FindVandor(user._id)
        return res.json(existingVandor)
    }
    return res.json({ message: 'Vandor information not found' })
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {}
