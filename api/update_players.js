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
      messages["mess"].push("Connection to Firebase failed"); // Handle connection error
      res.send(messages);
      return; // Exit the function
    }

    res.send(messages); // Send the populated messages object
  } catch (error) {
    res.send(error); // Handle other errors
  }
}