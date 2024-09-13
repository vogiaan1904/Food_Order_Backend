import { BadRequestsException, ErrorCode, NotFoundException } from '../exceptions'
import { FoodRepository } from '../repository'

export const FindFoodById = async (vandorId: string, foodId: string) => {
    const food = await FoodRepository.FindFoodById(foodId)
    if (food === null) {
        throw new NotFoundException('Food not found!', ErrorCode.PRODUCT_NOT_FOUND)
    }
    if (food.vandorId !== vandorId) {
        throw new BadRequestsException('Food not belong to user', ErrorCode.PRODUCT_DOES_NOT_BELONG)
    }
}

export const FindFoodByName = async (vandorId: string, foodName: string) => {}
