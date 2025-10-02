const {Pool} = require('pg');
require("dotenv").config();
module.exports = new Pool({
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
})