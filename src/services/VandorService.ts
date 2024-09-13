import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { Vandor } from '../models'
import { FoodRepository, VandorRepository } from '../repository'

export const GetProfile = async (vandorId: string, email?: string) => {
    let user
    if (email) {
        user = await VandorRepository.FindVandorByEmail(email)
    } else {
        user = await VandorRepository.FindVandorById(vandorId)
    }
    return user
}

export const EditProfile = async (vandorId: string, updateData: any) => {
    const updatedVandor = await VandorRepository.UpdateVandor(vandorId, updateData)
    return updatedVandor
}

export const UpdateService = async (vandorId: string) => {
    const existingVandor = await VandorRepository.FindVandorById(vandorId)
    if (existingVandor === null) {
        throw new NotFoundException('Vandor not found!', ErrorCode.USER_NOT_FOUND)
    }
    const newServiceState = !existingVandor.serviceAvailable
    const updatedVandor = await VandorRepository.UpdateVandorService(vandorId, { serviceAvailable: newServiceState })
    return updatedVandor
}

export const AddFood = async (vendor: any, data: any) => {
    const createdFood = await FoodRepository.CreateFood(vendor._id, data)
    console.log(createdFood)
    vendor.foods.push(createdFood)
    const upadtedVandor = await vendor.save()
    return upadtedVandor
}

export const GetAllFoods = async (vandorId: string) => {
    const foods = await FoodRepository.FindFoodsOfVandor(vandorId)
    if (foods.length === 0) {
        throw new NotFoundException('No foods found!', ErrorCode.PRODUCT_NOT_FOUND)
    }
    console.log(foods)
    return foods
}

export const GetFood = async (vandorId: string, foodId: string, name?: string) => {
    let food

    if (name) {
        food = await FoodRepository.FindFoodOfVandorByName(vandorId, name)
    } else {
        food = await FoodRepository.FindFoodOfVandorById(vandorId, foodId)
    }

    if (food === null) {
        throw new NotFoundException('Food not found!', ErrorCode.PRODUCT_NOT_FOUND)
    }
    return food
}

export const DeleteFood = async (vandorId: string, foodId: string) => {
    const response = await FoodRepository.DeleteFoodById(vandorId, foodId)
    return response
}
