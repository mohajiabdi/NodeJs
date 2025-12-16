import express from "express";
const app = express();
const PORT = 3000;

const Users = [
  {
    id: "101",
    Name: "Mohaji Abdi",
    Age: 25,
    Profession: "Software Engineer",
  },
  {
    id: "102",
    Name: "Ayan Ali",
    Age: 25,
    Profession: "Designer",
  },
];
app.get("/", (req, res) => {
  res.send("Hello Mohaji Abdi");
});
app.get("/Users", (req, res) => {
  res.send(Users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
