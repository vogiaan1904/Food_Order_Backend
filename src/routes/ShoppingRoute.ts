import express from 'express'
import {
    GetFoodAvailability,
    GetFoodsIn30min,
    GetRestaurantById,
    GetTopRestaurants,
    SearchFoods,
} from '../controllers/ShoppingController'
import { ErrorHandler } from '../utility'

const router = express.Router()

/* ---------------------------- Food Availability --------------------------- */
router.get('/:pincode', ErrorHandler(GetFoodAvailability))
/* ---------------------------- Top Restaurants --------------------------- */
router.get('/top-restaurants/:pincode', ErrorHandler(GetTopRestaurants))
/* ---------------------------- Food Available in 30 minutes --------------------------- */
router.get('/foods-in-30-min/:pincode', ErrorHandler(GetFoodsIn30min))
/* ---------------------------- Search Foods --------------------------- */
router.get('/search/:pincode', ErrorHandler(SearchFoods))
/* ---------------------------- Find Restaurant By Id --------------------------- */
router.get('/restaurant/:id', ErrorHandler(GetRestaurantById))

export { router as ShoppingRoute }
