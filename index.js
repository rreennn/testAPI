const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute.js");
const postRoute = require("./routes/postRoute.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(
    "mongodb://keren:admin123@backenddb-shard-00-00.weqfs.mongodb.net:27017,backenddb-shard-00-01.weqfs.mongodb.net:27017,backenddb-shard-00-02.weqfs.mongodb.net:27017/?replicaSet=atlas-th08ld-shard-0&ssl=true&authSource=admin"
  )
  .then(() => {
    console.log("Connected");
    app.listen(3000, () => {
      console.log("Server run at port 3000");
    });
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
