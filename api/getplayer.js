const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Legiaminh2010',
  database: 'leaderboard_cps'
})

module.exports = (req, res) => {
  connection.query('SELECT * FROM leaderboard_cps.test', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
  res.send("hello welcome to the server")
};


