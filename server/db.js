const pgp = require('pg-promise')({});
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

// Heroku database connection string
const proConfig = process.env.DATABASE_URL;

// This mimicks the heroku string
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

// Connection details
const db = pgp(isProduction ? proConfig : devConfig);

module.exports = db;