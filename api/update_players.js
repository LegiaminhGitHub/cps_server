const { MongoClient, Db } = require('mongodb');

const myData = {
  cps: 9.4,
  score: 36,
};

const messages = { mess: [] };
const uri = 'mongodb+srv://legiaminhoffice:16050356@newdatabase.idp7hup.mongodb.net/?retryWrites=true&w=majority&appName=newdatabase'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function log_db() {
  try {
    await client.connect();
    const db = client.db("cps-leaderboard");
    const collection = db.collection("user-data");

    const nameToUpdate = "legiaminh"; // Replace with the actual name to update

    const updateData = { $set: { cps: 10 } }; // Update the "cps" field

    const result = await collection.updateOne({ name: nameToUpdate }, updateData);

    if (result.modifiedCount > 0) {
      console.log("Document updated successfully!");
      messages.mess.push("Document updated successfully!");
    } else {
      const insertResult = await collection.insertOne({ name: nameToUpdate, ...myData }); // Insert if not found
      console.log("New document inserted successfully!");
      messages.mess.push("New document inserted successfully!");
    }
  } catch (error) {
    console.error("Error adding/updating data:", error);
    messages.mess.push("Error adding/updating data:", error);
  } finally {
    await client.close();
  }
}

module.exports = async (req, res) => {
  messages.mess.push("Welcome to the server");
  // await log_db(); // Wait for update to finish before sending response
  res.json(messages);
};
