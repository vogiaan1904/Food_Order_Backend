import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Vandor } from '../models'
import { VandorRepository } from '../repository'
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
        })
        return signature
    } else {
        throw new BadRequestsException('Incorrect password!', ErrorCode.INCORRECT_PASSWORD)
    }
}
