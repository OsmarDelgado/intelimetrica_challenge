import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const { restaurant } = new PrismaClient

export async function getRestaurants( req, res ) {
    res.json( 'Get Restaurants' )
}

export async function getRestaurantById( req, res ) {
    res.json( 'Get Restaurant By Id' )
}

export async function createRestaurant( req, res ) {
    res.json( 'Create A Restaurant' )
}

export async function updateRestaurant( req, res ) {
    res.json( 'Update A Restaurant' )
}

export async function deleteRestaurant( req, res ) {
    res.json( 'Delete A Restaurant' )
}
