const mysql = require('mysql2');
const pool  = mysql.createPool({
  host: 'sql108.infinityfree.com',
  user: 'if0_35940057',
  password: 'iuUaS2qActscHxo',
  database: 'if0_35940057_XXX',
  port: 3306
});


module.exports = (req, res) => {
    pool.query('SELECT * FROM leaderboard_cps.test', (err, results) => {
        if (err) {
            console.error(err);
            res.send(err)
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.send("Connected to the database successfully");
    });
};
