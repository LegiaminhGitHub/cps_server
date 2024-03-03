const { MongoClient } = require('mongodb');
// require('dotenv').config({ path: './api/.env' });

const myData = {
  cps: 9.4,
  score: 36,
};

let messages = { "mess": [] };
let client; // Declare the client variable at a higher scope

async function connectToMongoDB() {
  try {
    // const uri = process.env.MGDB_URI;
    client = new MongoClient("mongodb+srv://legiaminhoffice:16050356@newdatabase.idp7hup.mongodb.net/?retryWrites=true&w=majority&appName=newdatabase", { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    messages["mess"].push('Connected to MongoDB successfully!');
  } catch (error) {
    messages["mess"].push(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
}

async function log_db() {
  try {
    await connectToMongoDB(); // Connect to MongoDB first
    const db = client.db("cps-leaderboard");
    const collection = db.collection("user-data");

    const query = { name: "legiaminh" };
    const updateOperation = { $set: myData };

    const result = await collection.updateOne(query, updateOperation);

    if (result.modifiedCount > 0) {
      messages["mess"].push('Document updated successfully!');
    } else {
      await collection.insertOne(myData);
      messages["mess"].push('New document inserted successfully!');
    }
  } catch (error) {
    messages["mess"].push(`Error adding/updating data: ${error}`);
  } finally {
    if (client) {
      await client.close(); // Close the MongoDB connection
    }
  }
}

module.exports = async (req, res) => {
  try {
    await log_db();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
