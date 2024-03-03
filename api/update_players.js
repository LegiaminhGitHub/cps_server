const { MongoClient } = require('mongodb');

const myData = {
  cps: 9.4,
  score: 36,
};

let messages = { mess: [] };

const uri = "mongodb+srv://legiaminhoffice:16050356@newdatabase.idp7hup.mongodb.net/?retryWrites=true&w=majority&appName=newdatabase"; // Replace with your actual connection URI

async function connectToMongoDB() {
  try {
    await client.connect(uri);
    messages.mess.push('Connected to MongoDB successfully!');
  } catch (error) {
    messages.mess.push(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
}

// async function log_db() {
//   try {
//     await connectToMongoDB(); // Connect to MongoDB first
//     const db = client.db("cps-leaderboard");
//     const collection = db.collection("user-data");

//     const query = { name: "legiaminh" };
//     const updateOperation = { $set: myData };

//     const result = await collection.updateOne(query, updateOperation);

//     if (result.modifiedCount > 0) {
//       messages.mess.push('Document updated successfully!');
//     } else {
//       // Improved error handling: Check for specific error messages and provide informative feedback
//       try {
//         await collection.insertOne(myData);
//         messages.mess.push('New document inserted successfully!');
//       } catch (insertError) {
//         if (insertError.code === 11000) { // Handle duplicate key error
//           messages.mess.push('Error: Document already exists. Please adjust your data or update using a different identifier.');
//         } else {
//           messages.mess.push(`Error inserting/updating data: ${insertError}`);
//         }
//       }
//     }
//   } catch (error) {
//     messages.mess.push(`Error adding/updating data: ${error}`);
//   } finally {
//     if (client) {
//       await client.close(); // Close the MongoDB connection
//     }
//   }
// }

module.exports = async (req, res) => {
  try {
    await connectToMongoDB();
    res.send("action completed");
  } catch (error) {
    res.status(500).json({ eror: `Internal server error${error}` });
  }
};
