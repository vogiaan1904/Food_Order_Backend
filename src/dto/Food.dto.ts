import { z } from 'zod'

export interface CreateFoodInputs {
    name: string
    description: string
    category: string
    foodType: string
    readyTime: number
    price: number
}

export const CreateFoodSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    foodType: z.string(),
    readyTime: z.number().min(1),
    price: z.number().positive(),
})
