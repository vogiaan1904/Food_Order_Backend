import { NextFunction, Request, Response } from 'express'
import { CreateFoodInputs, CreateVandorSchema } from '../dto'
import { ErrorCode, NotFoundException } from '../exceptions'
import { Customer, Food, Vandor } from '../models'
import { AdminService, VandorService } from '../services'
import { GeneratePassword, GenerateSalt } from '../utility'
import { AddVandor } from '../services/AdminService'
import { date } from 'zod'

/* ----------------------------- Vandor handler ----------------------------- */

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = CreateVandorSchema.parse(req.body)
    const result = await AddVandor(validatedData)

    return res.json(result)
}

export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await VandorService.GetProfile(id)
    return res.json(result)
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminService.GetAllVandors()
    return res.json(result)
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
    const vandor = await VandorService.GetProfile(userId)
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

export const GetCustomers = async (req: Request, res: Response, next: NextFunction) => {}

export const DeleteAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Customer.deleteMany({})
        return res.json({ message: 'success' })
    } catch (error) {
        console.log(error)
    }
}
