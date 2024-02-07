const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Legiaminh2010",
    database: "leaderboard_cps"
});

module.exports = (req, res) => {
  var data = req.body;
  // You can use the 'data' variable to update your database here
  res.send({message :"welcome to the server !"});
};

