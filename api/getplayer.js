const mysql = require('mysql2');
const pool = mysql.createPool({
    host: "sql6.freesqldatabase.com	",
    user: 'sql6684534',
    password: '3V5Yxi9YXk',
    database: 'sql6684534',
    port: 3306,
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
