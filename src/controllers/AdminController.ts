import { NextFunction, Request, Response } from 'express'
import { CreateFoodSchema, CreateVandorSchema } from '../dto'
import { ErrorCode, NotFoundException } from '../exceptions'
import { Customer, Food, Vandor } from '../models'
import { AdminService, VandorService } from '../services'
import { GeneratePassword, GenerateSalt } from '../utility'
import { AddVandor } from '../services/AdminService'
import { date } from 'zod'
import { validate } from 'class-validator'
import { CustomerRespository } from '../repository'

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
    const result = await AdminService.DeleteAllVandors()
    return res.json(result)
}

export const AdminAddFood = async (req: Request, res: Response, next: NextFunction) => {
    const vandorId = req.params.id
    const validatedData = CreateFoodSchema.parse(req.body)
    const result = await AdminService.AddFood(vandorId, validatedData)
    return res.json(result)
}

/* ---------------------------- Customer Handler ---------------------------- */

export const GetCustomers = async (req: Request, res: Response, next: NextFunction) => {}

export const DeleteAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    const result = await CustomerRespository.DeleteAllCustomers()
    return res.json(result)
}
