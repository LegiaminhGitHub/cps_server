const { MongoClient } = require('mongodb');

const myData = {
  cps: 9.4,
  score: 36,
};

require("dotenv").config();

async function connectToMongoDB() {
  const uri = process.env.MGDB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB successfully!');

    // Export the connected client for use in other API functions
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function log_db() {
  try {
    const client = await connectToMongoDB(); // Connect to MongoDB first
    const db = client.db("cps-leaderboard");
    const collection = db.collection("user-data");

    const query = { name: "legiaminh" };
    const updateOperation = { $set: myData }; // Update the "cps" and "score" fields

    const result = await collection.updateOne(query, updateOperation); // Perform the update

    if (result.modifiedCount > 0) {
      console.log("Document updated successfully!");
    } else {
      await collection.insertOne(myData); // Insert a new document if not found
      console.log("New document inserted successfully!");
    }
  } catch (error) {
    console.error("Error adding/updating data:", error);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
}

module.exports = async (req, res) => {
  res.json({ message: "Welcome to the server" }); // Respond to the client immediately
  await log_db(); // Update or insert data in the background
};