const Pool = require("pg").Pool;

const pg_conn = new Pool({
  user: "fgtpuqlsbtvkkf",
  host: "ec2-3-216-167-65.compute-1.amazonaws.com",
  database: "dprdjhoipgf3p",
  password: "1f49fc30349740099fe9eec83368e7d5b772f514caf26c50eae6c919bd79b943",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pg_conn;