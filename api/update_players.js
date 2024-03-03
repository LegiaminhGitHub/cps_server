const mongoose = require('mongoose');
require('dotenv').config({ path: './api/.env' });

const myDataSchema = new mongoose.Schema({
  cps: Number,
  score: Number,
});

const MyDataModel = mongoose.model('MyData', myDataSchema);

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MGDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
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
      console.log('Document updated/inserted successfully:', result);
      res.send('Action completed');
    } else {
      console.error('Error updating/inserting data');
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
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
