import express from 'express'
import { ErrorHandler } from '../utility'
import {
    CustomerLogin,
    CustomerSignUp,
    CustomerVerify,
    GetCustomerProfile,
    RequestOtp,
    UpdateCustomerProfile,
} from '../controllers/CustomerController'

const router = express.Router()

/* --------------------------------- Signup --------------------------------- */
router.post('/signup', ErrorHandler(CustomerSignUp))

/* ---------------------------------- Login --------------------------------- */
router.post('/login', ErrorHandler(CustomerLogin))

// authenication

/* ------------------------- Verify Customer Account ------------------------ */
router.patch('/verify', ErrorHandler(CustomerVerify))

/* -------------------------- OTP / Requesting OTP -------------------------- */
router.get('/otp', ErrorHandler(RequestOtp))

/* --------------------------------- Profile -------------------------------- */
router.get('/profile', ErrorHandler(GetCustomerProfile))
router.patch('/profile', ErrorHandler(UpdateCustomerProfile))

export { router as CustomerRoute }
