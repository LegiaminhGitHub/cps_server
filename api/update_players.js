// const admin = require('firebase-admin');

const { json } = require("express");
const myData = {
  cps: 9.4,
  score: 36,
};
const messages = { "mess": [] };
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
async function addUserIfNotExists(userId) {
  try {
    const snapshot = await usersRef.child(userId).once('value');
    const userData = snapshot.val();

    if (!userData) {
      // User doesn't exist, add new data
      await usersRef.child(userId).set(myData);
      console.log(`User ${userId} added`);
      messages["mess"].push(`User ${userId} added`)
    } else {
      console.log(`User ${userId} already exists`);
      messages["mess"].push(`User ${userId} already exists`)
      try{
        await usersRef.child(userId).update(myData);
        console.log("user updated")
        messages["mess"].push("user updated")
      }
      catch(error){
        console.log(`theres a problem with the update please try again later \n ${err}`)
      }
    }
  } catch (error) {
    console.error('Error checking or adding user:', error);
  }
}

module.exports = async (req, res) => {
  // Initialize the messages object

  try {
    messages["mess"].push("Welcome to the server");
    var data = req.body; // Uncomment this line if you have data from the request body
    messages["mess"].push(data); // Assuming data is defined elsewhere

    try {
      const db = admin.database();
      const usersRef = db.ref('users');
      messages["mess"].push("Connected to Firebase server")
      addUserIfNotExists("mike"); // Successfully connected
    } catch (error) {

      messages["mess"].push(error)
      messages["mess"].push("Connection to Firebase failed")
      addUserIfNotExists("mike")
      ; // Handle connection error
      res.json(messages);
      return; // Exit the function
    }

    res.send(messages); // Send the populated messages object
  } catch (error) {
    res.send(error); // Handle other errors
  }
}