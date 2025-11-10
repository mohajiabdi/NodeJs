const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/");

client.connected()
  .db("UniversityDb")
  .collection("students")
  .insertOne({
    name: "Ali",
    age: 22,
  })
  .then(() => {
    console.log("connected to db and created new");
  })
  .catch((err) => {
    console.log("Error", err);
  });
