import { AuthPayload } from '../dto/Auth.dto'
import { Request } from 'express'

declare global {
    namespace Express {
        interface Request {
            user: AuthPayload
        }
    }
}
