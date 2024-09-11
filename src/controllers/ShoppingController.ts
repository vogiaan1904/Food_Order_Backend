import express, { Request, Response, NextFunction } from 'express'
import { FoodDoc, Vandor } from '../models'
import { FindFood } from './VandorController'
import { FindVandor } from './AdminController'
import { ErrorCode, NotFoundException } from '../exceptions'

export const GetFoodAvailability = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .populate('foods')

    if (result.length > 0) {
        let foodResult: any = []
        result.map((item) => foodResult.push(...item.foods))
        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: 'no foods available!' })
}

export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .limit(5)
    if (result.length > 0) {
        return res.status(200).json(result)
    }
    return res.status(400).json({ message: 'no foods available!' })
}

export const GetFoodsIn30min = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

    if (result.length > 0) {
        let foodResult: any = []

        result.map((vandor) => {
            const foods = vandor.foods as [FoodDoc]
            foodResult.push(...foods.filter((food) => food.readyTime <= 30))
        })

        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: 'no foods available!' })
}

export const SearchFoods = async (req: Request, res: Response, next: NextFunction) => {
    const pincode = req.params.pincode

    const result = await Vandor.find({ pincode: pincode, serviceAvailable: true }).populate('foods')

    if (result.length > 0) {
        let foodResult: any = []
        result.map((item) => foodResult.push(...item.foods))

        return res.status(200).json(foodResult)
    }

    return res.status(400).json({ message: 'no foods available!' })
}

export const GetRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    const restaurantId = req.params.id
    try {
        const result = await Vandor.findById(restaurantId).populate('foods')
        if (result) {
            return res.json(result)
        }
    } catch (error) {
        throw new NotFoundException('Restaurant not found!', ErrorCode.USER_NOT_FOUND)
    }
}
