
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://hadush:Hadush2025@ac-rr5rgzx-shard-00-00.qykxghx.mongodb.net:27017,ac-rr5rgzx-shard-00-01.qykxghx.mongodb.net:27017,ac-rr5rgzx-shard-00-02.qykxghx.mongodb.net:27017/?ssl=true&replicaSet=atlas-giolbt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
MongoClient.connect(uri, function(err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
