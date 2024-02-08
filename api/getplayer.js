const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Legiaminh2010',
  database: 'leaderboard_cps'
});

module.exports = (req, res) => {
    pool.query('SELECT * FROM leaderboard_cps.test', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.send("Connected to the database successfully");
    });
};
