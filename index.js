const express= require("express");
const app = express()
const { MongoClient } = require('mongodb');
const multer = require('multer');
const XlsxPopulate = require('xlsx-populate');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cors= require("cors")
app.use(cors());

const dbName = 'k_hub';
const collectionName = 'data';

const client = new MongoClient("mongodb://127.0.0.1:27017/");
async function retrieveDocuments() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Retrieve all documents in the collection
    const documents = await collection.find().toArray();
    console.log(documents)
    return(documents);
   
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

app.get("/data",async(req,res)=>{
    const data=await retrieveDocuments()
    res.send(data)
})

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Parse the uploaded Excel file
    const workbook = await XlsxPopulate.fromDataAsync(req.file.buffer);
    const worksheet = workbook.sheet(0);
    const rows = worksheet.usedRange().value();

    // Assuming the first row contains headers
    const headers = rows.shift();

    console.log({headers})

    // Create an object to hold the grouped data
    const groupedData = {};

    // Loop through each row and group the data under the same ID
    rows.forEach((row) => {
      const id = row[0]; // Assuming the first column contains the ID
      const data = {};
      const headings={};

      

      // Loop through the rest of the columns (excluding the ID column) and store the data in the data object
      for (let i = 1; i < row.length; i++) {
        data[headers[i]] = row[i];
      }

      // Check if the ID already exists in the groupedData object
      if (groupedData.hasOwnProperty(id)) {
        // If the ID already exists, add the data as a sub-document under that ID
        groupedData[id].push(data);
      } else {
        // If the ID does not exist, create a new entry with the ID and an array containing the data as the first sub-document
        groupedData[id] = [data];
      }
    });

    // Convert the grouped data object into an array of documents
    const documents = Object.keys(groupedData).map((id) => ({
      id: id,
      data: groupedData[id],
      headers:headers,
      textData: req.body.textData,
    }));

    // Insert the documents into the collection
    await collection.insertMany(documents);
    const success = { success: "success" };
    res.send(success);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

app.get("/data/:textdata", async (req, res) => {

  console.log(req.params)
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Retrieve all documents in the collection based on the textdata parameter
    const documents = await collection.find({ "textData": req.params.textdata }).toArray();
    console.log(documents);
    res.send(documents);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

  

app.listen(3000,()=>console.log("server running"))