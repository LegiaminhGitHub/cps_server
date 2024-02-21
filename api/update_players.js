const admin = require('firebase-admin');

// Load service account credentials from a JSON file
const serviceAccount = require('./click-per-second-web-firebase-adminsdk-8y5vt-50ce8c8b7b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://click-per-second-web-default-rtdb.asia-southeast1.firebasedatabase.app',
});

module.exports = async (req, res) => {
  try {
    const messages = { mess: [] }; // Initialize the messages object

    messages.mess.push("Welcome to the server");
    // Uncomment the following line if you have data from the request body
    // const data = req.body;
    // Assuming data is defined elsewhere
    // messages.mess.push(data);

    const db = admin.database();
    const usersRef = db.ref('users');
    messages.mess.push("Connected to Firebase server"); // Successfully connected

    // Send the populated messages object as a valid JSON response
    res.json(messages);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
