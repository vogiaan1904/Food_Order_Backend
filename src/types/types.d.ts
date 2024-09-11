import { AuthPayload } from '../dto'
import { Request } from 'express'

declare global {
    namespace Express {
        interface Request {
            user: AuthPayload
        }
    }
}
