import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Vandor } from '../models'
import { CustomerRespository, VandorRepository } from '../repository'
import { GenerateSignature, ValidatePassword } from '../utility'

export const VandorLogin = async (email: string, password: string) => {
    const existingVandor = await VandorRepository.FindVandorByEmail(email)
    if (existingVandor === null) {
        throw new NotFoundException('Vandor with email not found', ErrorCode.USER_NOT_FOUND)
    }
    const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt)
    if (validation) {
        const signature = GenerateSignature({
            _id: existingVandor.id,
            email: existingVandor.email,
            foodTypes: existingVandor.foodTypes,
            name: existingVandor.name,
            role: 'vendor',
        })
        return signature
    } else {
        throw new BadRequestsException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD)
    }
}

export const CustomerLogin = async (email: string, password: string) => {
    const existingCustomer = await CustomerRespository.FindCustomerByEmail(email)
    if (existingCustomer === null) {
        throw new NotFoundException('Customer with email not found', ErrorCode.USER_NOT_FOUND)
    }
    const validation = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt)
    if (validation) {
        const signature = GenerateSignature({
            _id: existingCustomer.id,
            email: existingCustomer.email,
            verified: existingCustomer.verified,
            role: 'customer',
        })
        return signature
    } else {
        throw new BadRequestsException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD)
    }
}
