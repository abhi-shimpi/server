const express = require("express");
const mongoose = require("./config/moongose");
const userController = require("./controllers/UserController");
const formController = require("./controllers/FormController");
const responseController = require("./controllers/ResponseController");
const exportResponseController = require("./controllers/ExportResponseController");
const cors = require('cors');

const app = express();
// const router = require("./controllers/UserController");
// const router1 = require("./controllers/FormController");
// const router2 = require("./controllers/ResponseController");

// const mongoose=mongoose();
app.use(express.json());

//To allow outside request 
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/user", userController);
app.use("/api/form", formController);
app.use("/api/response", responseController);
app.use("/api/export",exportResponseController)

app.listen(5000, (err) => {
  if (err) console.log(err);
  console.log("Server running at http://localhost:5000/");
});
