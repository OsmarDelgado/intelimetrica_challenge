function standardDeviation( restaurants, avgRating ) {
    const arr = restaurants.map( restaurant => {
        return ( restaurant.rating - avgRating ) ** 2
    } )

    const sum = arr.reduce( ( total, currentValue ) => {
        return ( total + currentValue )
    } )

    const variance = sum / (restaurants.length - 1)

    return Math.sqrt( variance )
}

export default standardDeviation
