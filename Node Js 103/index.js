const http = require("http");
const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017/");
const port = 3000;

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("UniversityDb");
    const studentCollection = db.collection("students");

    await studentCollection.insertMany([
      { id: 6006, name: "Maryan", dep: "IT" },
      { id: 6007, name: "Adan", dep: "Accounting" },
      { id: 6008, name: "Ali", dep: "Engineering" },
      { id: 6009, name: "Mohamed", dep: "Medicine" },
      { id: 6010, name: "Ahmed", dep: "IT" },
    ]);
    console.log("📥 Sample students inserted");
    // Create the HTTP server
    const server = http.createServer(async (req, res) => {
      if (req.url === "/students") {
        const allStudents = await studentCollection.find().toArray();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(allStudents, null, 2));
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Welcome to UniversityDB</h1>
                 <p>Go to <a href="/students">/students</a> to see all students.</p>`);
      }
    });

    server.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

startServer();
