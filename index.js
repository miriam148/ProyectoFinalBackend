require("dotenv").config();
const express = require("express");
//para multer
const path = require('path');
const cors = require("cors");

const app = express();

// Para servir las imágenes de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




const connectToDataBase = require('./db/db')

const userRoutes = require("./routes/usersRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const experienceRoutes = require("./routes/experienceRoutes.js")


app.use(cors());

app.use(express.json());

connectToDataBase()

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/experience", experienceRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});