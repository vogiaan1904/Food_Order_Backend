import { IsEmail, IsEmpty, Length } from 'class-validator'
import { z } from 'zod'

export const CustomerSignUpSchema = z.object({
    email: z.string().email(),
    phone: z.string().min(7).max(12),
    password: z.string().min(6).max(50),
})

export interface CustomerPayload {
    _id: string
    email: string
    verified: boolean
}
