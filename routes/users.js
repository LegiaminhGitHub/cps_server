var express = require('express');
const mysql = require('mysql2')
var app = express()
var router = express.Router();

//defines the data from the client
app.use(express.json());

//


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Legiaminh2010',
  database: 'leaderboard_cps'
})


//add 

let add_sql = `
  INSERT INTO leaderboard_cps.test
  (column1, column2 , column3)
  value(?,?,?)
`
// // try{
// //   connection.query('SELECT * FROM leaderboard_cps.test', (err, results, fields) => {
// //     if (err) throw err;
// //     console.log(results);
// //   });
// //   console.log("entered successfully");
// // }catch{
// //   console.log("no response");
// }
app.get('/api/getplayers', (req, res) => {
  connection.query('SELECT * FROM leaderboard_cps.test', (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/api/update_players" , (req , res) => {
  var data = req.body
  // connection.query(add_sql , (data) )
  res.send({message :"welcom the the server !"})
});
module.exports = router;

app.listen(3000, () => console.log('Server listening on port 3000'));



// import React from 'react';

// function MyComponent() {
//   const handleClick = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: 'Hello World' }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return <button onClick={handleClick}>Click me</button>;
// }

// export default MyComponent;
