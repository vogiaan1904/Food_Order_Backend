import { NextFunction, Request, Response } from 'express'
import { CreateVandorInputs } from '../dto'
import { Vandor } from '../models'
import { GeneratePassword, GenerateSalt } from '../utility'
import { ErrorCode, NotFoundException } from '../exceptions'

export const FindVandor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vandor.findOne({ email: email })
    } else {
        try {
            return await Vandor.findById(id)
        } catch (error) {
            throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
        }
    }
}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodTypes, email, password, ownerName, phone } = <CreateVandorInputs>req.body

    const existingVandor = await FindVandor('', email)

    if (existingVandor !== null) {
        return res.json({
            message: 'A vandor has been already existing with this email Id',
        })
    }

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)

    const createdVandor = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodTypes: foodTypes,
        email: email,
        password: userPassword,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        salt: salt,
        foods: [],
    })
    return res.json(createdVandor)
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    const vandors = await Vandor.find()
    if (vandors !== null) {
        return res.json(vandors)
    }

    return res.json({ message: 'No vandors' })
}

export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const vandorById = await FindVandor(id)

    if (vandorById !== null) {
        return res.json(vandorById)
    }

    return res.json({ message: 'No with the given id' })
}

export const DeleteAllVandors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Vandor.deleteMany({})
        return res.json({ message: 'success' })
    } catch (error) {
        console.log(error)
    }
}
