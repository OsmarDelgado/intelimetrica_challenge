import express from 'express'
const router = express.Router()

import { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, searchRestaurants } from '../controllers/restaurant.controller.js'

/**
 * CRUD Restaurants
 */
router.get( '/', getRestaurants )
router.get( '/:restaurantId(\d+)', getRestaurantById )
router.post( '/', createRestaurant )
router.put( '/:restaurantId(\d+)', updateRestaurant )
router.delete( '/:restaurantId(\d+)', deleteRestaurant )

/**
 * Search with params ( lat, lon, r )
 */
router.get( '/statistics', searchRestaurants )

export default router