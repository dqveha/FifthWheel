# ORIGINAL PROMPT

This application is a Used Car management application where car dealerships can manage their inventory of vehicles.

Each dealershp has a distinct set of automobiles that are managed by distinct users.

A user within a dealership should only be able to access automobiles for their dealership. This is important! Users should only be able to access cars from within their own dealership! If a user is able to access a car from a different dealership, then that would be a data breach.
Authentication Scheme would just be Basic Auth in an Authorization header. Usernames and passwords are in the users collection.

All data needed for these tasks can be found in the /data folder. You can act on those data files as if they are coming from a database

Please write 2 endpoints to allow for managing the automobile inventory for a dealership.
Request structure can be configured however works best.

    * POST /search **(ORIGINALLY GET /search)**
        ** allows users to search for automobiles within their dealership with filter capabilities to narrow down to specific vehicles
    * PUT /automobile
        ** allows users to update a vehicle entry in the data store, but only if the vehicle is a part of the dealership

Use any api framework or npm packages that you're comfortable with. Feel free to make assumptions about business logic not explicitly defined here.
