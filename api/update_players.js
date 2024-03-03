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
    connectToMongoDB()
    const db = client.db("cps-leaderboard");
    const collection = db.collection("user-data");

    const query = { name: "legiaminh" };
    const updateOperation = { $set: data }; // Update the "cps" field

    const result = await collection.updateOne(query, updateOperation);

    if (result.modifiedCount > 0) {
      messages.mess.push("Document updated successfully!");
      res.json(messages);
    } else {
      await collection.insertOne(data); // Insert a new document
      messages.mess.push("New document inserted successfully!");
    }
  } catch (error) {
    messages.mess.push("Error adding/updating data:", error);
    res.json(messages);
  } finally {
    res.json(messages);
    await client.close();
  }
}


module.exports = async (req, res) => {
  messages.mess.push("Welcome to the server");
  await log_db();
};
