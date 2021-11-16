# Zencity - Developer Candidate Assessment

The goal of this exercise is to design a simple API (REST or GraphQL) to an existing SQL database (attached). You may use any language or framework to fulfill the requirements. The ideal solution can run locally, serve requests via HTTP(s), and formats responses as JSON.

### Expose an API for querying reservations data

### Requirements:

- SQL:
    - Add a way to store “check-in” and “check-out” dates for reservations
    - Add a way to link reservations and listings
    - Add a way to store a listing's street address ZIP code
    - Add a way to store common amenities sometimes provided by a listing
        - (e.g., “Jacuzzi”, “Fireplace”, “Pool”)
        
- HTTP(s):
    - GET:
        - Capability to list all reservations
            - Include capability to filter by fields/attributes
                - (e.g. `/reservations?created_at=2021-10-01&status=pending`)
        
        - Capability to return one reservation
            - Include a field total nights booked (e.g., October 1-4 is a 3 night stay)
    - POST/PUT:
        - Create a new reservation
        - Modify one reservation
        - Modify multiple reservations



### MY SOLUTIONS:

- GENERAL EXPLANATION:
    - I built an API in JavaScript / Node.js using an Express server, and connected it to the database using the Node module Sequelize.
    
    - I used Yarn rather than NPM as my package manager
        - To start the application: navigate to the relevant folder in a terminal window, type `yarn` to download required Node modules, then type `yarn start` (or `node server.js`) to start the server
        - The default server port is 8000, but it can be run on a different port as well by creating a `.env` file with a variable called `PORT` indicating the desired port
        
    - I used Postman to test all my API routes; I also tested some of the GET routes in my browser.

- SQL:
    - All model-level solutions I added directly to the database, using SQLite Browser
    
    - Once the changes were incorporated to the database, I updated the Sequelize models to reflect the changes.
    
    - I made all the fields that were included in the original database required, and all new fields not required, so as to not make all the previous records invalid.  But this could be easily altered.
    
    - From what I can tell, SQLite doesn't have a specific date format -- I stored dates as text/strings using the format "YYYY-MM-DD"
    
    - I also stored zip codes as text
        - These could conceivably also be integers, but I figured since some zip codes are formatted with hyphens and since we are unlikely to be doing mathematical operations on the zip codes, strings made more sense.
        
    - My solution to amenities:
        - If this were a more built-out project, presumably we would want Amenities to be its own table, and have a Many-to-Many relationship with listings
        - For simplicity's sake, however, in this case I decided to just go with text
        - The amenities should be comma-separated with no spaces between amenities (for instance, "gym,pool,air conditioning,fireplace")
        - I wrote an additional API route that can filter listings based on an individual amenity, as a sort of proof of concept of this method (see details below)
    
    - For a larger scale / longer term project I would look into tracking database changes using migrations, but I did not feel it was necessary for something this size.
    
- API ROUTES:
    - GET:
        - "/api/reservations" will list all reservations
            - It also filters based on query parameters in the route
            - i.e. "/api/reservations?guests_count=3&is_rewards_member=1" will return all reservations made by rewards members with 3 guests
            
        - "/api/reservations/<id>" will return a single reservation
            - When returning an individual reservation, two additional pieces of information are also included beyond what shows up in the list of all reservations:
                - The number of nights booked: this is not stored in the database but is calculated on the server side after retrieving the record but before returning the result
                - The associated listing, if applicable.  I decided to opt for eager loading in cases where the individual reservation is being accessed.

        - "/api/listings" also returns all listings
            - This route also filters based on route query parameters, like the reservations
            - This route wasn't strictly speaking asked for, but I created it while working on other methods so I decided to leave it in
            
        - "/api/listings/amenities/<amenity>" returns a list of all listings that include the specified amenity, assuming that the amenities are listed as a string with amenities comma-separated and no spaces between them.
        
    - POST:
        - "/api/reservations" as a post request with a valid body will create a new reservation in the database.
        
    - PUT:
        - "/api/reservations/<id>" as a put request will update the record in question
            - Only the fields that are being changed need to be included in the put request; the rest will not be altered or deleted
            - If there are additional fields that the model doesn't recognize, the server will not attempt to add these fields to the database.  If any such fields are included, the JSON response will include an additional attribute "fieldsNotUpdated" that includes an array with the list of fields it was unable to update.  Any valid fields will still update.
            
        - "/api/reservations" as a put request will update multiple records simultaneously, provided the req.body is an object that includes the following attributes:
            - query: an object containing identifying information for all records to be updated
            - newValues: an object containing the new information that these records should have after the update.
            - example: to find all reservations of 3 guests where no last name was submitted, and enter the string "unknown" as the last name:
```
{
    "query": {"guest_last_name": null, "guests_count": 3},
    "newValues": {"guest_last_name": "unknown"}
}
```

- OTHER NOTES:

    - I wasn't sure how the IDs for the original data were generated, but they appeared to be 16-digit hashes and SQLite wasn't creating IDs on its own, so I wrote a function (in reservation.controller.js) to create an ID and then double-check to make sure it isn't already in use.  This could easily be removed if there is a more streamlined way of ID creation on the database side.
