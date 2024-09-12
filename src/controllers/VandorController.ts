import { NextFunction, Request, Response } from 'express'
import { CreateFoodInputs, UpdateVandorInputs, VandorLoginInputs } from '../dto'
import { FindVandor } from './AdminController'
import { GenerateSignature, ValidatePassword } from '../utility'
import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Food } from '../models'
import { AuthService, VandorService } from '../services'

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInputs>req.body
    const result = await AuthService.VandorLogin(email, password)
    return res.json(result)
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const result = await VandorService.FindVandorProfile(user._id)
    return res.json(result)
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    const { name, address, phone, foodTypes } = <UpdateVandorInputs>req.body

    //do not update non-value fields
    const updateData: Partial<UpdateVandorInputs> = {}

    if (phone) updateData.phone = phone
    if (name) updateData.name = name
    if (address) updateData.address = address
    if (foodTypes) updateData.foodTypes = foodTypes

    console.log(updateData)
    const result = await VandorService.EditVandorProfile(user._id, updateData)

    return res.json(result)
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

export const FindFood = async (id: string | undefined, name?: string) => {
    let food
    try {
        if (name) {
            food = await Food.find({ name: name })
        } else {
            food = await Food.findById(id)
        }
        return food
    } catch (error) {
        throw new NotFoundException('No food with the given name or id', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const GetFoodById = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const foodId = req.params.id
    let food

    try {
        food = await Food.findById(foodId)
    } catch (error) {
        throw new NotFoundException('No food with the given id', ErrorCode.PRODUCT_NOT_FOUND)
    }
    if ((food as any).vandorId === user._id.toHexString()) {
        return res.json(food)
    }
    return res.json({ message: 'Food does not belong to the vandor!' })
}

export const GetFoodByName = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const vandorId = user._id.toHexString()
    const foodName = req.body.name
    let food
    try {
        food = await Food.find({ name: foodName, vandorId: vandorId })
        return res.json(food)
    } catch (error) {
        throw new NotFoundException('No food with the given name', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const DeleteFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const vandorId = user._id.toHexString()
    const foodId = req.params.id
    let food

    try {
        food = await Food.findById(foodId)
    } catch (error) {
        throw new NotFoundException('No food with the given name', ErrorCode.PRODUCT_NOT_FOUND)
    }
    if ((food as any).vandorId === vandorId) {
        const deletedFood = await Food.deleteOne({ _id: foodId })
        return res.json(deletedFood)
    }
    return res.json({ message: 'Food does not belong to the vandor!' })
}
