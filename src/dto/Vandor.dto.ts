import { z } from 'zod'

export const CreateVandorSchema = z.object({
    name: z.string(),
    ownerName: z.string(),
    foodTypes: z.string().array(),
    pincode: z.string(),
    address: z.string(),
    phone: z.string().min(7).max(12),
    email: z.string().email(),
    password: z.string().min(6).max(50),
})

export const VandorLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
})

export const UpdateVandorSchema = z.object({
    name: z.string().min(3).optional(),
    address: z.string().optional(),
    phone: z.string().min(7).max(12).optional(),
    foodTypes: z.string().array().optional(),
})

export interface VandorPayload {
    _id: string
    email: string
    name: string
    foodTypes: [string]
}
