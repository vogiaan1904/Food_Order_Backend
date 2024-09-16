import { ErrorCode, InternalException, NotFoundException } from '../exceptions'
import { Vandor } from '../models'

export const CreateVandor = async (data: any, password: string, salt: string) => {
    try {
        const { name, address, pincode, foodTypes, email, ownerName, phone } = data
        const createdVandor = await Vandor.create({
            name: name,
            address: address,
            pincode: pincode,
            foodTypes: foodTypes,
            email: email,
            password: password,
            ownerName: ownerName,
            phone: phone,
            rating: 0,
            serviceAvailable: false,
            coverImages: [],
            salt: salt,
            foods: [],
        })
        return createdVandor
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const FindVandorById = async (userId: string) => {
    try {
        const vandor = await Vandor.findById(userId)
        return vandor
    } catch (error) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
}

export const FindVandorByName = async (name: string) => {
    const vandor = await Vandor.findOne({ name: name })
    return vandor
}

export const FindVandorByEmail = async (email: string) => {
    const vandor = await Vandor.findOne({ email: email })
    console.log(vandor)
    return vandor
}

export const FindAllVandors = async () => {
    const vandors = await Vandor.find()
    console.log(vandors)
    return vandors
}

export const UpdateVandor = async (userId: string, data: any) => {
    try {
        const updatedVandor = await Vandor.findByIdAndUpdate(userId, data, { new: true })
        return updatedVandor
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const UpdateVandorService = async (userId: string, serviceState: any) => {
    try {
        const updatedUser = await Vandor.findByIdAndUpdate(userId, serviceState, { new: true })
        return updatedUser
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const DeleteAllVandors = async () => {
    try {
        const response = await Vandor.deleteMany({})
        return response
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}
