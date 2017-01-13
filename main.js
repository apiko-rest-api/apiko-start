var Apiko = require('apiko')

// A little setup:

var config {
  port: 5000,
  // prefix: 'api' // will prepend URLs with /api, e.g.: /api/users, no prefix by default
}

// You can also have your config in a separate file, see config.js.

if (process.argv[2] === 'prod') {
  // protects /dev/ UI with the secret generated on the first run (see apiko.json)
}

if (process.argv[2] === 'dev') {
  config.maintainBrowserTab = true,
  config.protect = false, // if true, protects /dev/ UI with the secret generated on the first run (see apiko.json), use for production
  config.verbosity = 2 // 0 - 3
}

// Your custom request processing:

Apiko.on('GET /collection/action', (request, store) => {
  // request.method contains the HTTP method received, uppercased, 'GET' in this case

  // Now two cases can happen here:

  // CASE 1: you have not defined the specified (URL) endpoint in Apiko GUI

  // Request parameters are stored in the request.params property and are
  // never validated. You have to validate them here.

  if ((request.method == 'GET') || (request.method == 'POST')) {
    if (request.params.foo) {
    // In order to respond to the client, you need to call:
      request.respondSuccess({any: 'data'}) // 200 OK
    } else {
    // If you are not happy, you can respond with an error:
      request.respondError(400, 'Custom message', 76)
      // args: HTTP status code, custom message, custom error code, all optional
      // custom error codes should be > 100
    }
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

  // You always have to call request.respondSuccess() or request.respondError() in
  // this handler to make the web server respond!
})

Apiko.on('POST /justaction', (request, store) => {
  // You can define any custom endpoint addresses.

  // You probably also want to work with data, you can access any data collection
  // using the store argument with collection names as you can see them in Apiko GUI:

  // store.collectionName.row(335) // returns row with id == 335 as an object
  // store.collectionName.query('SELECT * FROM Users WHERE registered > ?',  params) // users who registered within the last hour
})

// Normally it's a good idea to split your code into files:
Apiko.on('GET /custom/action', require('./custom/action'))
// You can also have one handler handling multiple HTTP methods
Apiko.on('PUT /custom/action', require('./custom/action'))

// Let Apiko run this for you:
Apiko.run(config)