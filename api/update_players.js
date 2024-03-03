const { MongoClient } = require('mongodb');

const myData = {
  cps: 9.4,
  score: 36,
};

require("dotenv").config();
let messages = {"mess" : []} 
async function connectToMongoDB() {
  const uri = process.env.MGDB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    messages["mess"].push('Connected to MongoDB successfully!')

    // Export the connected client for use in other API functions
    return client;
  } catch (error) {
    messages["mess"].push(`Error connecting to MongoDB:${error}`)
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
      messages["mess"].push('Document updated successfully!')
      
    } else {
      await collection.insertOne(myData); // Insert a new document if not found
      messages["mess"].push('New document inserted successfully!')
    }
  } catch (error) {;
    messages["mess"].push(`Error adding/updating data:, ${error}`)
  } finally {
    await client.close(); // Close the MongoDB connection
  }
}

module.exports = async (req, res) => {
  try{
    await log_db()
  }
  catch{
    res.json(messages["mess"])
  }
};