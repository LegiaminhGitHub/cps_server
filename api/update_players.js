const admin = require('firebase-admin');

const serviceAccount = require('./click-per-second-web-firebase-adminsdk-8y5vt-50ce8c8b7b.json');
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
const db = admin.database();
const usersRef = db.ref('users');

async function addUserIfNotExists(userId) {
  try {
    const snapshot = await usersRef.child(userId).once('value');
    const userData = snapshot.val();

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


module.exports = (req, res) => {
  var data = req.body;
  // You can use the 'data' variable to update your database here
  res.send({message :`welcome to the server ! ${data}`});
};

