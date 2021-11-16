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






NODE PACKAGES REQUIRED:
- express
- dotenv
- cors
- sqlite3
- sequelize
