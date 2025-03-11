require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const userRoutes = require("./routes/users.router");
const orderRoutes = require("./routes/orders.router");
const authRoutes = require("./routes/auth.router");
const connectToDataBase = require("./db/db");


const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);


connectToDataBase()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});