import { ErrorCode, NotFoundException } from '../exceptions'
import { Vandor } from '../models'
import { VandorRepository } from '../repository'

export const FindVandorProfile = async (userId: string) => {
    const user = await VandorRepository.FindVandorById(userId)
    return user
}

export const EditVandorProfile = async (userId: string, updateData: any) => {
    const existingVandor = await VandorRepository.FindVandorById(userId)
    if (existingVandor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    const updatedVander = await VandorRepository.UpdateVandor(userId, updateData)
    return updatedVander
}
