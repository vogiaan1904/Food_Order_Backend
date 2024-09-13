import { NextFunction, Request, Response } from 'express'
import { CreateFoodSchema, UpdateVandorSchema, VandorLoginSchema } from '../dto'
import { AuthService, VandorService } from '../services'

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = VandorLoginSchema.parse(req.body)
    const result = await AuthService.VandorLogin(email, password)
    return res.json(result)
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const result = await VandorService.GetProfile(user._id)
    return res.json(result)
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const validatedData = UpdateVandorSchema.parse(req.body)

    console.log(validatedData)
    const result = await VandorService.EditProfile(user._id, validatedData)
    return res.json(result)
}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const result = await VandorService.UpdateService(user._id)
    return res.json(result)
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const vendor = (req as any).user
    const validatedData = CreateFoodSchema.parse(req.body)
    const result = await VandorService.AddFood(vendor, validatedData)
    return res.json(result)
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const result = await VandorService.GetAllFoods(user._id)
    return res.json(result)
}

export const GetFoodById = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const foodId = req.params.id
    const result = await VandorService.GetFood(user._id, foodId)
    return res.json(result)
}

export const GetFoodByName = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const foodName = req.body.name
    const result = await VandorService.GetFood(user._id, '', foodName)
    return res.json(result)
}

export const DeleteFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user
    const foodId = req.params.id
    const result = await VandorService.DeleteFood(user._id, foodId)
    return res.json(result)
}
