# INTELIMÉTRICA CHALLENGE

A simple CRUD REST API for restaurants and searching in a circumference area all restaurants registered in the DB.

This works passing the latitude and longitude by parameters and a radius for search how many restaurants is in the area, the mean of the rating of all restaurants found and a standard deviation of the ratings of each restaurants

This application is deployed in Heroku on the next link: https://intelimetrica-challenge.herokuapp.com/

All endpoint are:
* Get all restaurants: `/api/v1/restaurants`
* Get a restaurant by id: `/api/v1/restaurants/{uuid}`
* Create a restaurant: `/api/v1/restaurants`
* Update a restaurant: `/api/v1/restaurants/{uuid}`
* Delete a restaurant: `/api/v1/restaurants/{uuid}`
* Get all restaurants: `/api/v1/restaurants/statistics?latitude=x&longitude=y&radius=z`

This last endpoint is where search all restaurants in a radius.