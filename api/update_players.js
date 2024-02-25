// const admin = require('firebase-admin');
// const serviceAccount = require('./click-per-second-web-firebase-adminsdk-8y5vt-50ce8c8b7b.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://click-per-second-web-default-rtdb.asia-southeast1.firebasedatabase.app',
// });

const { json } = require("express");
const { MongoClient, Db } = require('mongodb');
const myData = {
  cps: 9.4,
  score: 36,
};


const uri = 'mongodb+srv://legiaminhoffice:16050356@newdatabase.idp7hup.mongodb.net/?retryWrites=true&w=majority&appName=newdatabase'; // Your MongoDB URI

const client = new MongoClient(uri);
const find_query = {"name" : "legiaminh"};
var data = {"name" : "legiaminh" , "cps" : 10 };

var update_query = {$set: {}}
async function log_db() {
    try {
      await client.connect();
      const db = client.db("cps-leaderboard");
      const collection = db.collection("user-data");
  
      const query = { name: "legiaminh" };
      const updateOperation = { $set: data }; // Update the "cps" field
  
      const result = await collection.updateOne(query, updateOperation);
  
      if (result.modifiedCount > 0) {
        messages["mess"].push("Document updated successfully!");
      } else {
        await collection.insertOne(data); // Insert a new document
        messages["mess"].push("New document inserted successfully!");
      }
    } catch (error) {
      messages["mess"].push("Error adding/updating data:", error);
    } finally {
      await client.close();
    }
  }
  

  

log_db()

const messages = { "mess": [] };

module.exports = async (req, res) => {
  messages["mess"].push("welcome to the server")
  log_db()
  res.json(messages)
};
