import { ErrorCode, InternalException } from '../exceptions'
import { Customer } from '../models'

export const GetAllCustomers = async () => {
    try {
        const customers = await Customer.find()
        return customers
    } catch (error) {
        throw new InternalException('Database query failed', ErrorCode.UNPROCESSABLE_ENTITY, error)
    }
}
