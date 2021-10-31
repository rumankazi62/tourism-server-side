const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqlp4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
  try{
    await client.connect();
    const database = client.db('travel_agency');
    const travelData = database.collection('traveldata');
    
    //Travel Services
    app.get('/services', async(req,res) => {
      const cursor = travelData.find({});
      const services = await cursor.toArray();
      res.send(services);
    })
    
    // Travel Post
    app.post('/services', async(req,res) => {
      const service = req.body;
      const result = await travelData.insertOne(service);
      res.json(result);
    })
    // Delete post
    app.delete('/services/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await travelData.deleteOne(query);
      res.json(result);
    })
  }
  finally{
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req,res) => {
  res.send('Travelling In Bangladesh Server in running');
});

app.listen(port, () => {
  console.log('Travelling server running at port: ', port);
})