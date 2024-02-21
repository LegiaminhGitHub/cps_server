const admin = require('firebase-admin');

const serviceAccount = require('../click-per-second-web-firebase-adminsdk-8y5vt-50ce8c8b7b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://click-per-second-web-default-rtdb.asia-southeast1.firebasedatabase.app',
});
// Data to insert
const myData = {
  cps: 9.4,
  score: 36,
};

// Access the Realtime Database
;

async function addUserIfNotExists(userId) {
  try {

    if (!userData) {
      // User doesn't exist, add new data
      await usersRef.child(userId).set(myData);
      console.log(`User ${userId} added`);
    } else {
      console.log(`User ${userId} already exists`);
      try{
        await usersRef.child(userId).update(myData);
        console.log("user updated")
      }
      catch(error){
        console.log(`theres a problem with the update please try again later \n ${err}`)
      }
    }
  } catch (error) {
    console.error('Error checking or adding user:', error);
  }
}

// Example usage:
// addUserIfNotExists('mike'); // Replace with the actual user ID

module.exports = async (req, res) => {
  const messages = { "mess": [] }; // Initialize the messages object

  try {
    messages["mess"].push("Welcome to the server");
    // var data = req.body; // Uncomment this line if you have data from the request body
    messages["mess"].push(data); // Assuming data is defined elsewhere

    try {
      const db = admin.database();
      const usersRef = db.ref('users');
      messages["mess"].push("Connected to Firebase server"); // Successfully connected
    } catch (error) {
      messages["mess"].push("Connection to Firebase failed"); // Handle connection error
      res.send(messages);
      return; // Exit the function
    }

    res.send(messages); // Send the populated messages object
  } catch (error) {
    res.send(error); // Handle other errors
  }
};