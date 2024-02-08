const mysql = require('mysql2');
;
const user_input  = "john"
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Legiaminh2010',
  database: 'leaderboard_cps'
})
module.exports = (req, res) => {
    res.send("hello welcome to the server")

    try{
        connection.query('SELECT * FROM leaderboard_cps.test', (err, results) => {
            if (err) {
              return res.status(500).json({ error: 'Database query failed' });
            }
            else{            
                res.send("connected to the database successfully")
            }

        });
        
    }
    catch{
        res.send("theres a problem")
    }
//   });
};


