const path = require("path");

const env = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

if (env === "production") {
  console.warn("Running migrations in PRODUCTION");
  console.warn(`DB_HOST=${process.env.DB_HOST}`);
  console.warn(`DB_NAME=${process.env.DB_NAME}`);

  if (["127.0.0.1", "localhost"].includes(process.env.DB_HOST)) {
    console.warn(" PROD database appears to be on localhost");
  }
}

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
};

module.exports = {
  development: base,
  production: base,
};
