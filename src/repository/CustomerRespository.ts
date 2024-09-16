import { custom } from 'zod'
import { ErrorCode, InternalException, NotFoundException } from '../exceptions'
import { Customer } from '../models'

export const CreateCustomer = async (data: any, password: string, salt: string, otp: number, expiry: Date) => {
    const { email, phone } = data
    try {
        const createdCustomer = await Customer.create({
            email: email,
            password: password,
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
        return createdCustomer
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const FindCustomerById = async (customerId: string) => {
    try {
        const customer = await Customer.findById(customerId)
        return customer
    } catch (error) {
        throw new NotFoundException('Customer not found!', ErrorCode.USER_NOT_FOUND)
    }
}

export const FindCustomerByEmail = async (email: string) => {
    const customer = await Customer.findOne({ email: email })
    console.log(customer)
    return customer
}

export const GetAllCustomers = async () => {
    try {
        const customers = await Customer.find()
        return customers
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const DeleteAllCustomers = async () => {
    try {
        const response = await Customer.deleteMany()
        return response
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const UpdateCustomer = async (customerId: string, data: any) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, data, { new: true })
        return updatedCustomer
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}
