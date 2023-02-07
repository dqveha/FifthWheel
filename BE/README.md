<!-- /*

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

*/ -->

# Used Car Dealerships (API)

1. API created through the Express library. `Serverport = 6060`, `Testing port = 1979`

- Run script `npm run dev` to activate API

2. Jest and Supertest are used for testing the controller logic and endpoints.

   - Run `npm run test` to run test and obtain coverage
   - If there is an error that relates to open handle within Jest, please comment out lines `33-35` in `./src/index.js`

```
  31 | const apiRouter = express.Router();
  32 | app.use(express.json());
> 33 | // app.listen(serverPort, () =>
> 34 | //   console.log(`API Server listening on port ${serverPort}`)
> 35 | // );
  36 |
```

3. There are two main routing endpoints.

   - `/api/middleware` to test for authentication and authorization with Jest/Supertest. Verifies if user has correct login information and then passes user's dealership id within endpoint.

   - `/api/automobiles`

   ```
   1. POST /search

   REQUIRED request structure in the body to view all automobiles within user's lot:

   {
     username: 'sun_tomorrow',
     password: 'yummy*&browser)(cookies',
     dealershipId: '78945412',
     data: {
       details: {},
     },
   }
   ====================================================================================

   OPTIONAL request structure in the body that includes detail object and price options within user's lot:

   {
     username: 'khakis4me',
     password: 'i_secretly*like%geico',
     dealershipId: '454875421',
     data: {
       details: {
         condition: 'heavily',
         color: 'green',
         ...etc
       },
       priceType: 'msrp',
       lowestPricePoint: 1000,
       highestPricePoint: 2000,
     },
   }
   ====================================================================================
   ```

   ```
   2.  PUT /automobile

   REQUIRED request structure in the body:

   {
     username: 'onedoesnotsimply',
     password: 'still*&alive',
     dealershipId: '62497531',
     data: {
       details: {
         id: 'afaa46f6-0228-491a-8388-20f58b2be34b',
         color: 'bleu',
         type: 'Nest',
         condition: 'heavily',
         msrp: 111,
         ...etc
       },
     },
   }
   ====================================================================================
   ```
