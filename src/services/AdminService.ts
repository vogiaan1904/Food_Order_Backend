import { VandorService } from '.'
import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { FoodRepository, VandorRepository } from '../repository'
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

export const AddFood = async (vandorId: string, data: any) => {
    const vendor = await VandorService.GetProfile(vandorId)
    if (vendor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    const createdFood = await FoodRepository.CreateFood(vandorId, data)
    vendor.foods.push(createdFood)
    const updatedVender = await vendor.save()
    return updatedVender
}

export const DeleteAllVandors = async () => {
    const response = await VandorRepository.DeleteAllVandors()
    return response
}
