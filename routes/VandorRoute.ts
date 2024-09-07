import express, { Request, Response, NextFunction } from 'express'
import {
    GetVandorProfile,
    UpdateVandorProfile,
    UpdateVandorService,
    VandorLogin,
} from '../controllers/VandorController'
import { Authentication } from '../middlewares'
const router = express.Router()
router.post('/login', VandorLogin)

router.use(Authentication)
router.get('/profile', GetVandorProfile)
router.patch('/profile', UpdateVandorProfile)
router.patch('/service', UpdateVandorService)
export { router as VandorRoute }
