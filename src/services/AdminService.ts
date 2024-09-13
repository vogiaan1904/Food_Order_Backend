import { BadRequestsException, ErrorCode } from '../exceptions'
import { VandorRepository } from '../repository'
import { GeneratePassword, GenerateSalt } from '../utility'

export const AddVandor = async (data: any) => {
    const { email, password } = data
    const existingVandor = await VandorRepository.FindVandorByEmail(email)

    if (existingVandor !== null) {
        throw new BadRequestsException('Vandor already exists with the given email', ErrorCode.USER_ALREADY_EXISTS)
    }

    const salt = await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt)
    const newVandor = await VandorRepository.CreateVandor(data, userPassword, salt)
    return newVandor
}

export const GetVandorByEmail = async (email: string) => {
    const user = await VandorRepository.FindVandorByEmail(email)
    return user
}

export const GetAllVandors = async () => {
    const vandors = await VandorRepository.FindAllVandors()
    return vandors
}
