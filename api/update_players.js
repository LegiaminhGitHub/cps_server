// const admin = require('firebase-admin');
const serviceAccount = require('./click-per-second-web-firebase-adminsdk-8y5vt-50ce8c8b7b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://click-per-second-web-default-rtdb.asia-southeast1.firebasedatabase.app',
});
const { json } = require("express");
const myData = {
  cps: 9.4,
  score: 36,
};
const messages = { "mess": [] };

async function addUserIfNotExists(userId) {
  try {
    const snapshot = await usersRef.child(userId).once('value');
    const userData = snapshot.val();

    if (!userData) {
      // User doesn't exist, add new data
      await usersRef.child(userId).set(myData);
      messages["mess"].push(`User ${userId} added`);
    } else {
      messages["mess"].push(`User ${userId} already exists`);
      try {
        await usersRef.child(userId).update(myData);
        messages["mess"].push("User updated");
      } catch (error) {
        messages["mess"].push(`Error updating user data: ${error.message}`);
      }
    }
  } catch (error) {
    messages["mess"].push("Connection to Firebase failed");
    messages["mess"].push(`Error: ${error.message}`);
  }
}

module.exports = async (req, res) => {
  try {
    messages["mess"].push("Welcome to the server");
    var data = req.body; // Uncomment this line if you have data from the request body
    messages["mess"].push(data); // Assuming data is defined elsewhere

    const db = admin.database();
    const usersRef = db.ref('users');
    messages["mess"].push("Connected to Firebase server");
    await addUserIfNotExists("mike"); // Successfully connected

    res.json(messages); // Send the populated messages object
  } catch (error) {
    await addUserIfNotExists("mike")
    res.json({ error: "Internal server error" }); // Return valid JSON error response
  }
};
