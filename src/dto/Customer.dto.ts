import { z } from 'zod'

export const CustomerSignUpSchema = z.object({
    email: z.string().email(),
    phone: z.string().min(7).max(12),
    password: z.string().min(6).max(50),
})

export const CustomerLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
})

export const CustomerUpdateSchema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    address: z.string().min(3).optional(),
})

export interface CustomerPayload {
    _id: string
    email: string
    verified: boolean
    role: 'customer'
}
