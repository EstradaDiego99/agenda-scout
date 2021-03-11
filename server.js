const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database connected successfully"))
  .catch((err) => console.log(err));

const miembrosRouter = require("./src/miembro/_router");
app.use("/api/miembros", miembrosRouter);

const gruposRouter = require("./src/grupo/_router");
app.use("/api/grupos", gruposRouter);

const provinciasRouter = require("./src/provincia/_router");
app.use("/api/provincias", provinciasRouter);

const signup = require("./src/miembro/signup/_router");
app.use("/api/signup", signup);

const loginRouter = require("./src/miembro/login/_router");
app.use("/api/login", loginRouter);

const authRouter = require("./src/_auth/_router");
app.use("/api/authenticate", authRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server is running on port: ${port}`));
