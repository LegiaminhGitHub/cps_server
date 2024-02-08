const mysql = require('mysql2');

try{
    const user_input  = "john"
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Legiaminh2010',
  database: 'leaderboard_cps'
})
}
catch{
    throw(error)
}

module.exports = (req, res) => {
    res.send("hello welcome to the server")
    try{
        const user_input  = "john"
        const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Legiaminh2010',
      database: 'leaderboard_cps'
    })
    }
    catch{
        res.send("theres a problem with teh db")
        throw(error)
    }
    
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


