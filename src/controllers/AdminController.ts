import { NextFunction, Request, Response } from 'express'
import { CreateFoodInputs, CreateVandorInputs } from '../dto'
import { Vandor, Customer, Food } from '../models'
import { GeneratePassword, GenerateSalt } from '../utility'
import { ErrorCode, NotFoundException } from '../exceptions'

/* ----------------------------- Vandor handler ----------------------------- */

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

export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const vandorById = await FindVandor(id)

    if (vandorById !== null) {
        return res.json(vandorById)
    }

    return res.json({ message: 'No with the given id' })
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    const vandors = await Vandor.find()
    if (vandors !== null) {
        return res.json(vandors)
    }

    return res.json({ message: 'No vandors' })
}

export const DeleteAllVandors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Vandor.deleteMany({})
        return res.json({ message: 'success' })
    } catch (error) {
        console.log(error)
    }
}

export const AdminAddFood = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    const vandor = await FindVandor(userId)
    if (vandor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body
    const createdFood = await Food.create({
        vandorId: userId,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        readyTime: readyTime,
        price: price,
        images: [],
        rating: 0,
    })
    vandor.foods.push(createdFood)
    const result = await vandor.save()
    return res.json(result)
}

/* ---------------------------- Customer Handler ---------------------------- */

export const GetCustomers = async (req: Request, res: Response, next: NextFunction) => {
    const customers = await Customer.find()
    if (customers !== null) {
        return res.json(customers)
    }

    return res.json({ message: 'No customers' })
}

export const DeleteAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Customer.deleteMany({})
        return res.json({ message: 'success' })
    } catch (error) {
        console.log(error)
    }
}
