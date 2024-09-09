import { NextFunction, Request, Response } from 'express'
import { CreateFoodInputs, UpdateVandorInputs, VandorLoginInputs } from '../dto'
import { FindVandor } from './AdminController'
import { GenerateSignature, ValidatePassword } from '../utility'
import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Food } from '../models'

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body

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
            foodTypes: existingVandor.foodTypes,
            name: existingVandor.name,
        })

        return res.json(signature)
    } else {
        throw new BadRequestsException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD)
    }
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const existingVandor = await FindVandor(user._id)
    return res.json(existingVandor)
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    const existingVandor = await FindVandor(user._id)
    if (existingVandor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    const { name, address, phone, foodTypes } = <UpdateVandorInputs>req.body
    existingVandor.name = name
    existingVandor.address = address
    existingVandor.phone = phone
    existingVandor.foodTypes = foodTypes
    const updateResult = await existingVandor.save()
    return res.json(updateResult)
}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const existingVandor = await FindVandor(user._id)
    if (existingVandor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    existingVandor.serviceAvailable = !existingVandor.serviceAvailable
    const updateResult = await existingVandor.save()
    return res.json(updateResult)
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const vandor = await FindVandor(user._id)
    if (vandor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    const { name, description, category, foodType, readyTime, price } = <CreateFoodInputs>req.body
    const createdFood = await Food.create({
        vandorId: user._id,
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

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    const foods = await Food.find({ vandorId: user._id })
    if (foods === null) {
        return res.json({ message: 'No foods available!' })
    }
    return res.json(foods)
}
