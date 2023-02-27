const mongoose = require("mongoose");
var mongo = require('mongodb');
const express = require("express");
var MongoClient = mongo.MongoClient;  
const url = "mongodb+srv://user:sanjeet123@cluster0.hpg7xhg.mongodb.net/articles?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;
const cors = require('cors');
mongoose.set('strictQuery', true);
const client = new MongoClient(url, {
  maxPoolSize: 100,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = express();
app.use(cors());

app.get('/getData', async (req, res) => {
    try {
      await client.connect();
      const collection = client.db('articles').collection('article');
      const data = await collection.find().toArray();
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    } finally {
      // await client.close();
    }
  });
  
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
   