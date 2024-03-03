const mongoose = require('mongoose');
require('dotenv').config();

const myDataSchema = new mongoose.Schema({
  name: String,
  cps: Number,
  score: Number,
});
const myData = {
  cps: 9.4,
  score: 36,
};

const MyDataModel = mongoose.model('MyData', myDataSchema);

async function connectToMongoDB() {
    await mongoose.connect(process.env.MGDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

}

module.exports = async (req, res) => {
  try {
    await connectToMongoDB();

    // Create or update a document
    const query = { name: 'legiaminh' };
    const update = { $set: myData };
    const options = { upsert: true, new: true };
    const result = await MyDataModel.findOneAndUpdate(query, update, options);

    if (result) {
      res.send('Action completed');
    } else {
      res.json({ error: `Internal server error${error}` });
    }
  } catch (error) {
    res.json({ error: `Internal server error${error}` });
  }
};

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
