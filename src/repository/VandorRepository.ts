import { ErrorCode, NotFoundException } from '../exceptions'
import { Vandor } from '../models'

export const FindVandorById = async (userId: string) => {
    const user = await Vandor.findById(userId)
    if (user === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    return user
}

export const UpdateVandor = async (userId: string, data: any) => {
    const updatedUser = await Vandor.findByIdAndUpdate(userId, data, { new: true })
    if (updatedUser === null) {
        throw new NotFoundException('Vandor not found for update!', ErrorCode.USER_NOT_FOUND)
    }
    return updatedUser
}
