//
// This file is not used by default. If you would like to load config from this file,
// remove all config calls from main.js and replace them with just this call:
//
// var config = require('./config')
//

var config = {
	port: 5000,
	// prefix: 'api' // will prepend URLs with /api, e.g.: /api/users, no prefix by default
}

// Apiko uses SQLite by default, you don't need to change anything. But if
// you really want to:
//
// config.db.dialect = 'mysql' // 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
// config.db.host = 'localhost'
// config.db.name = 'mydb' // database name
// config.db.user = 'root'
// config.db.pass = 'root'

if (process.argv[2] === 'prod') {
	// config.port = 80
}

if (process.argv[2] === 'dev') {
  config.verbosity = 2 // 0 - 3
}

//
// Need a custom run environment?
//
// if (process.argv[2] === 'yourOwnEnv') { ... }
// npm run yourOwnEnv
//

module.exports = config