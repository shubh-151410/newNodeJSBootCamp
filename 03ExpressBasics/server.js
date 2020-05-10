const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("Hello Shubhanshu");
});

app.get("/about", (req, res) => {
  res.send("<h2>About me</h2>");
});

app.get("/user", (req, res) => {
  res.status(200).json({ user: "shyam", balance: "2000" });
});

app.post("/login", (req, res) => {
  res.send("login successful");
});

app.listen(5000, () => {
  console.log("Server is running at port no 5000...");
});
