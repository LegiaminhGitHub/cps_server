const mysql = require('mysql2');
const pool  = mysql.createPool({
  host: "https://clickpersecond-web.000webhostapp.com/",
  user: 'id21883367_legiaminh',
  password: 'Cps_server_db##16050356',
  database: 'id21883367_cps_prod',
  port: 3307
});


module.exports = (req, res) => {
    pool.query('SELECT * FROM leaderboard_cps.test', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        res.send("Connected to the database successfully");
    });
};
