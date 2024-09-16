import { AuthPayload } from '../dto'
import { BadRequestsException, ErrorCode, NotFoundException, UnauthorizedException } from '../exceptions'
import { CustomerRespository } from '../repository'
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOtp } from '../utility'

export const CustomerSignUp = async (data: any) => {
    const { email, phone, password } = data
    const existingCustomer = await CustomerRespository.FindCustomerByEmail(email)
    if (existingCustomer !== null) {
        throw new BadRequestsException('Customer already exists!', ErrorCode.USER_ALREADY_EXISTS)
    }

    const salt = await GenerateSalt()
    const customerPassword = await GeneratePassword(password, salt)
    const { otp, expiry } = GenerateOtp()
    console.log(otp)
    const createdCustomer = await CustomerRespository.CreateCustomer(data, customerPassword, salt, otp, expiry)
    if (createdCustomer) {
        await onRequestOtp(
            email,
            'Verification Email',
            `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
        )

        if (!createdCustomer._id) {
            throw new NotFoundException('Unprocessable Entity', ErrorCode.UNPROCESSABLE_ENTITY)
        }
        const customerId = createdCustomer._id.toString()
        const signature = GenerateSignature({
            _id: customerId,
            email: createdCustomer.email,
            verified: createdCustomer.verified,
            role: 'customer',
        })
        return { signature: signature, verified: createdCustomer.verified }
    } else {
        throw new NotFoundException('Unprocessable Entity', ErrorCode.UNPROCESSABLE_ENTITY)
    }
}
export const VerifyOtp = async (customer: AuthPayload, otp: number) => {
    const profile = await CustomerRespository.FindCustomerById(customer._id)
    if (profile) {
        if (profile.otp === otp && profile.otp_expiry >= Date.now()) {
            profile.verified = true

            const updatedCustomerResponse = await profile.save()

            const signature = GenerateSignature({
                _id: updatedCustomerResponse.id,
                email: updatedCustomerResponse.email,
                verified: updatedCustomerResponse.verified,
                role: 'customer',
            })
            return { signature: signature, verified: updatedCustomerResponse.verified }
        }
        throw new UnauthorizedException('OTP verification failed', ErrorCode.UNAUTHORIZED)
    }
}
export const RequestOtp = async (customer: AuthPayload) => {
    const profile = await CustomerRespository.FindCustomerById(customer._id)
    if (profile) {
        const { otp, expiry } = GenerateOtp()
        console.log(otp)
        profile.otp = otp
        profile.otp_expiry = expiry.getTime()

        await profile.save()
        console.log(profile)
        await onRequestOtp(
            profile.email,
            'Verification Email',
            `<h1>Please confirm your OTP</h1>
             <p>Here is your OTP code: ${otp}</p>`
        )
        return { message: 'OTP sent' }
    }
}

export const EditCustomerProfile = async (customerId: string, data: any) => {
    const updatedCustomer = await CustomerRespository.UpdateCustomer(customerId, data)
    return updatedCustomer
}
