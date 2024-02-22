// const admin = require('firebase-admin');

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
      messages["mess"].push("error:" , error)
      messages["mess"].push("Connection to Firebase failed");
      addUserIfNotExists("mike"); // Only call this once
      res.json(messages);
      return;
    }
    
    res.send(messages); // Send the populated messages object
  } catch (error) {
    res.send(error); // Handle other errors
  }
}