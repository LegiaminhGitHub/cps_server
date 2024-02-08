const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Legiaminh2010',
  database: 'leaderboard_cps'
})

let update_db_command = `UPDATE leaderboard_cps.test SET cps = ?, score = ? WHERE player_name = ?`;
let insert_db = `INSERT INTO leaderboard_cps.test (player_name, cps, score) VALUES (?, ?, ?)`;
let search_player = `SELECT * FROM leaderboard_cps.test WHERE player_name = ?`;
//name , cps , score
// let data_insert = ["john", 20, 30];

let ended_func = false;
function insert_into_db(){
    connection.query(insert_db, data_insert, (err, result) => {
        if(err){
            console.log(err);
        }
    });
}

function update_db(data_insert){
    let data_update = [data_insert[1], data_insert[2], data_insert[0]];
connection.query(update_db_command, data_update, (err , result) => {
    if(err){
        console.log("there is an issue with db connection")
    }
    try{
        if(result.affectedRows === 0){
            console.log("No player named: " + data_insert[0] + " at the moment")
            insert_into_db()
        }
        else{
            console.log("UPDATE successfully")
        }
    }
    catch{
        console.log('There was an error: ' + err + " during the process")
        ended_func = true
    }
});
}

function find_exist(user_input){
    connection.query(search_player, [user_input], (err , result) => {
    if(err){
        console.log("there is an issue with db connection")
    }
    try{
        console.log(result)
    }
    catch{
        console.log("there's an error while reading the data")
    }
    return result;
});
}



function db_actions(){

}
module.exports = (req, res) => {
    let user_data = req.body
    find_exist(user_data)
    res.send("hello welcome to the server")

};


