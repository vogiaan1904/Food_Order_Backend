import express, { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, validateOrReject } from 'class-validator'
import { CreateCustomerInputs } from '../dto/Customer.dto'
import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Customer } from '../models/Customer'
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOtp } from '../utility'
import { verify } from 'jsonwebtoken'
export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body)
    const inputErrors = await validate(customerInputs)
    if (inputErrors.length > 0) {
        const formattedErrors = inputErrors.map((e) => ({
            property: e.property,
            constraints: e.constraints,
        }))
        throw new BadRequestsException('Unprocessable Entity', ErrorCode.UNPROCESSABLE_ENTITY, formattedErrors)
    }
    // await validateOrReject(customerInputs) // throw an array of ValidationError

    const { email, phone, password } = customerInputs
    const existingCustomer = await Customer.findOne({ email: email })
    if (existingCustomer !== null) {
        throw new BadRequestsException('Customer already exists!', ErrorCode.USER_ALREADY_EXISTS)
    }

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)
    const { otp, expiry } = GenerateOtp()

    const result = await Customer.create({
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
    })

    if (result) {
        await onRequestOtp(
            email,
            'Verification Email',
            `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
        )

        if (!result._id) {
            throw new NotFoundException('Unprocessable Entity', ErrorCode.UNPROCESSABLE_ENTITY)
        }
        const customerId = result._id.toString()
        const signature = GenerateSignature({
            _id: customerId,
            email: result.email,
            verified: result.verified,
        })
        return res.json({ signature: signature, verified: result.verified, email: result.email })
    }
}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {}

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {}

export const UpdateCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {}
