import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
dotenv.config({ path: '.env' })

export const MONGO_URL = process.env.MONGO_URL as string
export const SECRET_KEY = process.env.SECRET_KEY as Secret
export const PORT = process.env.PORT

export const MAIL_HOST = process.env.MAIL_HOST
export const MAIL_USERNAME = process.env.MAIL_USERNAME
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD
