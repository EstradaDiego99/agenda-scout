const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const muchachosRouter = require("./routes/muchachos");
app.use("/muchachos", muchachosRouter);

const gruposRouter = require("./routes/grupos");
app.use("/grupos", gruposRouter);

const provinciasRouter = require("./routes/provincias");
app.use("/provincias", provinciasRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
