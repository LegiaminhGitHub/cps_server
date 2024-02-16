const mysql = require('mysql2');
const pool = mysql.createPool({
    host: "sql6.freesqldatabase.com",
    user: 'sql6684534',
    password: '3V5Yxi9YXk',
    database: 'sql6684534',
    port: 3306,
});

module.exports = (req, res) => {
    var messages = { "message": [] }; // Corrected key name

    messages["message"].push("Welcome to the server");

    pool.query('SELECT * FROM cps_db_prod.data_cps_5secs', (err, results) => {
        if (err) {
            console.error(err);
            messages["message"].push("Cannot connect to the database");
            return res.status(500).json({ error: 'Database query failed', details: err });
        }
        messages["message"].push("Connected to the database successfully");
        res.send({ messages }); // Send the entire messages object as JSON
    });
};
