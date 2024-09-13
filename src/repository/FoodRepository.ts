import { createTestAccount } from 'nodemailer'
import { Food, Vandor } from '../models'
import { ErrorCode, InternalException, NotFoundException } from '../exceptions'

export const CreateFood = async (vandorId: string, data: any) => {
    try {
        const createdFood = await Food.create({
            vandorId: vandorId,
            name: data.name,
            description: data.description,
            category: data.category,
            foodType: data.foodType,
            readyTime: data.readyTime,
            price: data.price,
            images: [],
            rating: 0,
        })
        return createdFood
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY)
    }
}

export const FindFoodsOfVandor = async (vandorId: string) => {
    try {
        const foods = await Food.find({ vandorId: vandorId })
        return foods
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const FindFoodById = async (id: string) => {
    try {
        const food = await Food.findById(id)
        return food
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const FindFoodByName = async (name: string) => {
    try {
        const food = await Food.find({ name: name })
        return food
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const FindFoodOfVandorById = async (vandorId: string, id: string) => {
    try {
        const food = await Food.findOne({ _id: id, vandorId: vandorId })
        return food
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const FindFoodOfVandorByName = async (vandorId: string, name: string) => {
    try {
        const food = await Food.findOne({ name: name, vandorId: vandorId })
        return food
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}

export const DeleteFoodById = async (vandorId: string, id: string) => {
    try {
        const response = await Food.deleteOne({ vandorId: vandorId, _id: id })
        return response
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}
