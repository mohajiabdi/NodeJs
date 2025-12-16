const http = require("http");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/");
const port = 3000;

async function startServer() {
  try {
    await client.connect();
    console.log("Mongodb Is connected!");

    const db = cleint.db("UniversityDb");
    const studentCollection = db.collection("students");

    const server = http.createServer(async (req, res) => {
      const allStudents = await studentCollection.find().toArray();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(allStudents, null, 2));
    });

    server.listen(port, () => {
      console.log(`Server is listening localhost:${port}`);
    });
  } catch (err) {
    console.log("Error", err);
  }
}

// const http = require("http");
// const mongodb = require("mongodb");
// const { MongoClient } = require("mongodb");
// // import http from 'http';
// // import { MongoClient } from "mongodb";
// const port = 9000;

// const uri = "mongodb://localhost:27017/";

// function ConnectionDB() {
//   const client = new MongoClient(uri);

//   client
//     .connect()
//     .then(() => {
//       console.log("Connected to db");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// const server = http.createServer((req, res) => {});

// server.listen(port, () => {
//   console.log(`server running on localhost:${port}`);
// });
// ConnectionDB();
