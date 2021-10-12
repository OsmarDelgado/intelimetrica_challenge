import express from 'express'
const router = express.Router()

import { getRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, searchRestaurants } from '../controllers/restaurant.controller.js'

/**
 * CRUD Restaurants
 */
router.get( '/', getRestaurants )
router.get( '/:restaurantId([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})', getRestaurantById )
router.post( '/', createRestaurant )
router.put( '/:restaurantId([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})', updateRestaurant )
router.delete( '/:restaurantId([0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12})', deleteRestaurant )

/**
 * Search with params ( lat, lon, r )
 */
router.get( '/statistics', searchRestaurants )

export default router