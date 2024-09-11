import express from 'express'
import {
    CreateVandor,
    DeleteAllCustomers,
    DeleteAllVandors,
    GetCustomers,
    GetVandorById,
    GetVandors,
} from '../controllers'
import { ErrorHandler } from '../utility'
const router = express.Router()
router.post('/vandor', ErrorHandler(CreateVandor))
router.get('/vandors', ErrorHandler(GetVandors))
router.get('/vandor/:id', ErrorHandler(GetVandorById))
router.delete('/vandors', ErrorHandler(DeleteAllVandors))

router.get('/customers', ErrorHandler(GetCustomers))
router.delete('/customers', ErrorHandler(DeleteAllCustomers))

export { router as AdminRoute }
