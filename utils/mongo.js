const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://admin:admin@cluster0-brkmi.mongodb.net/test"
MongoClient.connect(uri, function (err, client) {
  if (err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
  }
  console.log('Connected...');
  const collection = client.db("pmock").collection("users");
  // perform actions on the collection object
  client.close();
});
