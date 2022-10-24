const express = require("express");
require("dotenv").config();
require("colors");
const connectDB = require("./config/db")
const winston = require("winston");
var helmet = require("helmet");
const cors = require("cors")
const app = express();

connectDB()
app.use(helmet({
   contentSecurityPolicy: false,
   crossOriginEmbedderPolicy: false
}))
require("./startup/logging")()
require("./startup/routes")(app)
const path = require("path");

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/build")))
   app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")))
} else {
   app.get("/", (req, res) => {
      res.json({ message: "API running..." })
   })
}


// connecting to database

app.use(
   cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"]
   })
)

// server started
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => winston.info(`Server started on port ${PORT}`))