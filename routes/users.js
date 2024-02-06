var express = require('express');
const mysql = require('mysql2')
var router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'legiaminh',
  password: 'Legiaminh2010',
  database: 'root'
})
connection.query('SELECT * FROM leaderboard_cps.test', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

app.get('/api/players', (req, res) => {
  connection.query('SELECT * FROM leaderboard_cps.test', (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;
