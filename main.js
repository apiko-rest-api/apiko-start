var Apiko = require('apiko')

// A little setup:

Apiko.config.port = 5000

if (process.argv[2] === 'prod') {
}

if (process.argv[2] === 'dev') {
  Apiko.config.maintainBrowserTab = true,
  Apiko.config.verbose = true
}

// Need a custom run environment?
// if (process.argv[2] === 'yourOwnEnv') { ... }
// npm run yourOwnEnv

// Your custom request processing:

Apiko.on('/collection/action', (params, request, store) => {
  // Now two cases can happen here:

  // CASE 1: you have not defined the specified (URL) endpoint in Apiko GUI

  // Request parameters are stored in the params argument and are
  // never validated. You have to validate them here.

  if (params.foo) {
  // In order to respond to the client, you need to call:
    request.respondWithSuccess({any: 'data'}) // 200 OK
  } else {
  // If you are not happy, you can respond with an error:
    request.respondWithError(400, 'Custom message', 76)
    // args: HTTP status code, custom message, custom error code, all optional
  }

  // CASE 2: the specified (URL) endpoint is defined in Apiko GUI

  // The params will be processed according to your Apiko GUI validation
  // setup and this callback will never be called if they are invalid.

  // Furthermore, if the specified endpoint is a special endpoint processed
  // by Apiko itself (e.g. a user login at /users/login), the request.response
  // property will be present and will contain an object describing how would
  // Apiko normally respond to this request, for example:
  //
  // Error: { status: 401, message: 'The username parameter is missing.', code: 1 }
  // Success: { status: 200, data: { session: 's43v094ioag345...' }}
})

Apiko.on('/justaction', (params, request, store) => {
  // You can define any custom endpoints addresses.

  // You probably also want to work with data, you can access any data collection
  // using the store argument with collection names as you can see them in Apiko GUI:

  // store.collectionName.row(335) // returns row with id == 335 as an object
  // store.collectionName.query('SELECT * FROM Users WHERE registered > ?',  params) // users who registered within the last hour
})

// Normally it's a good idea to split your code into files:
Apiko.on('/custom/action', require('./custom/action'))

// Let Apiko run this for you:
Apiko.run()