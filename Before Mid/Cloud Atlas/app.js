const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://mohaji:lamya%40123@cluster0.1njg2s0.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("UniversityDb");
    const students = db.collection("students");

    // await students.insertOne({ name: "Mohaji", age: 23 });
    // console.log("✅ Student inserted");
    const studentsList = await students.find().toArray();
    console.log("🎉 Found students:", studentsList);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed");
  }
}

run();
