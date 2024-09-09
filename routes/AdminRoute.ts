import express from 'express'
import { CreateVandor, DeleteAllVandors, GetVandorById, GetVandors } from '../controllers'
import { ErrorHandler } from '../utility/ErrorUtility'
const router = express.Router()
router.post('/vandor', ErrorHandler(CreateVandor))
router.get('/vandors', ErrorHandler(GetVandors))
router.get('/vandor/:id', ErrorHandler(GetVandorById))
router.delete('/vandors', ErrorHandler(DeleteAllVandors))

export { router as AdminRoute }
