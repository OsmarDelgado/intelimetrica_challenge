/**
 * Importing Libraries
 */
// Import Express
import express from 'express'
// Import Morgan
import morgan from 'morgan'
// Import Helmet
import helmet from 'helmet'
// Import as pkg the package.json
import pkg from '../package.json'
import dotenv from 'dotenv'
import { importCSV } from './libs/importCSV.js'
dotenv.config()

/**
 * Importing Routes
 */
import restaurantRoutes from './routes/restauran.routes.js'

/** 
 * Initialization
 */
const app = express()
// Initial set up
importCSV()

// Import data from package.json for get its information
app.set( 'pkg', pkg )

/**
 * Middlewares
 */
// Initial morgan
app.use( morgan('dev') )
// Use Helmet
app.use( helmet() )
// Config app for undestand json
app.use( express.json() )
// For recive simple data
app.use( express.urlencoded( { extended : false } ) )

/**
 * Routes
 */
app.use( '/api/v1/restaurants', restaurantRoutes )

/**
 * GET home
 */
app.get( '/', ( req, res ) => {
    // Show in client the name, author, description and version from package.json (pkg)
    res.json( {
        application : app.get('pkg').name,
        author : app.get('pkg').author,
        description : app.get('pkg').description,
        version : app.get('pkg').version
    } )
} )

export default app;
