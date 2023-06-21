const Pool = require("pg").Pool;

const pg_conn = new Pool({
  user: "postgres",
  host: "containers-us-west-89.railway.app",
  database: "postgres",
  password: "adc72Fb7NE5f9jJ2LhKI",
  port: 7770,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pg_conn;