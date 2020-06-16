let knex = require('knex');
let knexfile = require('../knexfile');

// let config = knexfile.development;
// console.log(config, 'config in connections.js');
// module.exports = knex(config);

let environment = process.env.NODE_ENV || "development";

module.exports = knex(knexfile[environment]);
