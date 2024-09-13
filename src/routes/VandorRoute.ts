import express from 'express'
import {
    AddFood,
    DeleteFood,
    GetFoodById,
    GetFoodByName,
    GetFoods,
    GetVandorProfile,
    UpdateVandorProfile,
    UpdateVandorService,
    VandorLogin,
} from '../controllers/VandorController'
import { Authentication } from '../middlewares'
import { ErrorHandler } from '../utility'

const router = express.Router()
router.post('/login', ErrorHandler(VandorLogin))

router.use(Authentication)
router.get('/profile', ErrorHandler(GetVandorProfile))
router.patch('/profile', ErrorHandler(UpdateVandorProfile))
router.patch('/service', ErrorHandler(UpdateVandorService))

router.post('/food', ErrorHandler(AddFood))
router.get('/foods', ErrorHandler(GetFoods))
router.get('/food/:id', ErrorHandler(GetFoodById))
router.get('/food', ErrorHandler(GetFoodByName))
router.delete('/food/:id', ErrorHandler(DeleteFood))

export { router as VandorRoute }
