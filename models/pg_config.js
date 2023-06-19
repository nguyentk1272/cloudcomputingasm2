const Pool = require('pg').Pool;

const pg_conn = new Pool (
    {
        user: 'qamjtdyddhwaey',
        host: 'ec2-35-170-146-54.compute-1.amazonaws.com',
        database: 'dbp8mhtvg2qbmf',
        password: 'dd2239bda2d44061126b08fcde49199501b3c65849b422a5c3f531f4009a1947',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
          },
    });

module.exports = pg_conn;