// const admin = require('firebase-admin');

const { json } = require("express");

// // Load service account credentials from a JSON file
// const serviceAccount = require('./click-per-second-web-firebase-adminsdk-8y5vt-50ce8c8b7b.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://click-per-second-web-default-rtdb.asia-southeast1.firebasedatabase.app',
// });

// module.exports = async (req, res) => {
//   try {
//     const messages = { mess: [] }; // Initialize the messages object

//     messages.mess.push("Welcome to the server");
//     // Uncomment the following line if you have data from the request body
//     // const data = req.body;
//     // Assuming data is defined elsewhere
//     // messages.mess.push(data);

//     const db = admin.database();
//     const usersRef = db.ref('users');
//     messages.mess.push("Connected to Firebase server"); // Successfully connected

//     // Send the populated messages object as a valid JSON response
//     res.json(messages);
//   } catch (error) {
//     console.error('Error handling request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

module.exports = async (req, res) => {
  // Initialize the messages object
  const messages = { "mess": [] };

  try {
    messages["mess"].push("Welcome to the server");
    var data = req.body; // Uncomment this line if you have data from the request body
    messages["mess"].push(data); // Assuming data is defined elsewhere

    try {
      const db = admin.database();
      const usersRef = db.ref('users');
      messages["mess"].push("Connected to Firebase server"); // Successfully connected
    } catch (error) {
      messages["mess"].push("Connection to Firebase failed")
      messages["mess"].push(error)
      ; // Handle connection error
      res.json(messages);
      return; // Exit the function
    }

    res.send(messages); // Send the populated messages object
  } catch (error) {
    res.send(error); // Handle other errors
  }
}