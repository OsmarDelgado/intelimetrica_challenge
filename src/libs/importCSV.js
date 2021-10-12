import Prisma from '@prisma/client'
import { readFileSync } from 'fs'
import { parse } from 'fast-csv'
import { fileURLToPath } from "url";
import { dirname } from "path";
const { PrismaClient } = Prisma

const { restaurant } = new PrismaClient
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const restaurantes = readFileSync( __dirname + '/restaurantes.csv' )

export async function importCSV() {
    const counter = await restaurant.count()

    if( counter > 0 ) return

    const parser = parse( { headers : [ "id", "rating", "name", "site", "email", "phone", "street", "city", "state", "lat", "lng" ] } )
        .on( 'error', error => console.error( error ) )
        .on( 'data', async row => {
            try {
                if( !isNaN( parseInt( row.rating ) ) ) {
                    await restaurant.create( {
                        data : {
                            id : row.id,
                            rating : parseInt( row.rating ),
                            name : row.name,
                            site : row.site,
                            email : row.email,
                            phone : row.phone,
                            street : row.street,
                            city : row.city,
                            state : row.state,
                            lat : parseFloat( row.lat ),
                            lon : parseFloat( row.lng )
                        }
                    } )
                }
            } catch (error) {
                console.log( error )
            }
        } )
        .on( 'end', rowCount => console.log( `Parsed ${rowCount} rows` ) )

    parser.write( restaurantes )
    parser.end()
}