import express, { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, validateOrReject } from 'class-validator'
import { CustomerLoginSchema, CustomerSignUpSchema, CustomerUpdateSchema } from '../dto/Customer.dto'
import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Customer } from '../models/Customer'
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOtp } from '../utility'
import { verify } from 'jsonwebtoken'
import { AuthService, CustomerService } from '../services'
export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = CustomerSignUpSchema.parse(req.body)
    const result = await CustomerService.CustomerSignUp(validatedData)
    return res.json(result)
}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = CustomerLoginSchema.parse(req.body)
    const { email, password } = validatedData
    const result = await AuthService.CustomerLogin(email, password)
    return res.json(result)
}

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body
    const customer = (req as any).user
    const result = await CustomerService.VerifyOtp(customer, otp)
    return res.json(result)
}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {
    const customer = (req as any).user
    const result = await CustomerService.RequestOtp(customer)
    return res.json(result)
}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = (req as any).user
    const validatedData = CustomerUpdateSchema.parse(req.body)
    const result = await CustomerService.EditCustomerProfile(customer._id, validatedData)
    return res.json(result)
}

export const UpdateCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {}
