import Prisma from '@prisma/client'
import geojson from "geojson";
import geolib from "geolib";
import standardDeviation from '../libs/standardDeviation.js';

const { PrismaClient } = Prisma
const { restaurant } = new PrismaClient

/**
 * CRUD Restaurants
 */
export async function getRestaurants( req, res ) {
    // res.json( 'Get Restaurants' )
    try {
        const restaurants = await restaurant.findMany()

        return res.status( 200 ).json( {
            message : 'Restaurants',
            data : restaurants
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error"
        } )
    }
}

export async function getRestaurantById( req, res ) {
    // res.json( 'Get Restaurant By Id' )
    const { restaurantId } = req.params

    try {
        const restaurantFound = await restaurant.findUnique( {
            where : {
                id : restaurantId
            }
        } )

        if( !restaurantFound ) {
            return res.status( 404 ).json( {
                message : "Restaurant does not exist!"
            } )
        }
    
        return res.status( 200 ).json( {
            message : "Restaurant",
            data : restaurantFound
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error"
        } )
    }
}

export async function createRestaurant( req, res ) {
    // res.json( 'Create A Restaurant' )
    const { rating, name, site, email, phone, street, city, state, lat, lon } = req.body

    try {
        const restaurantCreated = await restaurant.create( {
            data : {
                rating,
                name,
                site,
                email,
                phone,
                street,
                city,
                state,
                lat,
                lon
            }
        } )

        return res.json( {
            message : 'Restaurant created',
            data : restaurantCreated
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error"
        } )
    }
}

export async function updateRestaurant( req, res ) {
    // res.json( 'Update A Restaurant' )
    const { restaurantId } = req.params
    const { rating, name, site, email, phone, street, city, state, lat, lon } = req.body

    try {
        const verifyRestaurant = await restaurant.findUnique( {
            where : {
                id : restaurantId
            }
        } )

        if( !verifyRestaurant ) {
            return res.status( 404 ).json( {
                message : "Restaurant does not exist!",
            } )
        }

        const restaurantUpdate = await restaurant.update( {
            where : {
                id : verifyRestaurant.id
            },

            data : {
                rating,
                name,
                site,
                email,
                phone,
                street,
                city,
                state,
                lat,
                lon
            }
        } )

        return res.status( 201 ).json( {
            message : 'Restaurant Updated',
            data : restaurantUpdate
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error"
        } )
    }
}

export async function deleteRestaurant( req, res ) {
    // res.json( 'Delete A Restaurant' )
    const { restaurantId } = req.params
    
    try {
        const restaurantFount = await restaurant.findUnique( {
            where : {
                id : restaurantId
            }
        } )

        if( !restaurantFount ) {
            return res.status( 404 ).json( {
                message : 'Restaurant not found!'
            } )
        }

        const restaurantDeleted = await restaurant.delete( {
            where : {
                id : restaurantFount.id
            }
        } )

        return res.status( 204 ).json( {
            message : 'Restaurant deleted successfully',
            data : restaurantDeleted
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error"
        } )
    }
}

/**
 * Search with params ( lat, lon, r )
 */
export async function searchRestaurants( req, res ) {
    // res.json( 'searching restaurants' )
    const { latitude, longitude, radius } = req.query
    const center = { latitude, longitude }

    try {
        const restaurantLocations = await restaurant.findMany( {
            select : {
                rating : true,
                lat : true,
                lon : true
            }
        } )
    
        const restaurants = restaurantLocations.filter( restaurant => {
            // console.log( restaurant )
            const location = { latitude : restaurant.lat, longitude : restaurant.lon }
            return geolib.isPointWithinRadius( location, center, radius )
        } )
    
        const avgRating = restaurants.reduce( ( total, currentValue ) => {
            return ( total + currentValue.rating )
        }, 0 ) / restaurants.length

        const std = standardDeviation( restaurants, avgRating )
    
        return res.status( 201 ).json( {
            count : restaurants.length,
            avg : avgRating,
            std,
            // data : restaurants
        } )

    } catch (error) {
        console.log( error )

        return res.status( 500 ).json( {
            message : "Internal Server Error"
        } )
    }
}
