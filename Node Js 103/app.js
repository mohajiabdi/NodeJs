const http = require("http");
const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");
// import http from 'http';
// import { MongoClient } from "mongodb";
const port = 9000;

const uri = "mongodb://localhost:27017/";

function ConnectionDB() {
  const client = new MongoClient(uri);

  client
    .connect()
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
}

const server = http.createServer((req, res) => {});

server.listen(port, () => {
  console.log(`server running on localhost:${port}`);
});
ConnectionDB();
