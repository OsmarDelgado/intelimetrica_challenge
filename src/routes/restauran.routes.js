import express from 'express'
const router = express.Router()

import { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurant.controller.js'

router.get( '/', getRestaurants )
router.get( '/:restaurantId', getRestaurantById )
router.post( '/', createRestaurant )
router.put( '/:restaurantId', updateRestaurant )
router.delete( '/:restaurantId', deleteRestaurant )

export default router