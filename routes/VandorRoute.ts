import express from 'express'
import {
    AddFood,
    GetFoods,
    GetVandorProfile,
    UpdateVandorProfile,
    UpdateVandorService,
    VandorLogin,
} from '../controllers/VandorController'
import { Authentication } from '../middlewares'
import { ErrorHandler } from '../utility/ErrorUtility'

const router = express.Router()
router.post('/login', ErrorHandler(VandorLogin))

router.use(Authentication)
router.get('/profile', ErrorHandler(GetVandorProfile))
router.patch('/profile', ErrorHandler(UpdateVandorProfile))
router.patch('/service', ErrorHandler(UpdateVandorService))

router.post('/food', ErrorHandler(AddFood))
router.get('/foods', ErrorHandler(GetFoods))
export { router as VandorRoute }
