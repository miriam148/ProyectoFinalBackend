const dbUrl = process.env.MONGO_URL;
const mongoose = require('mongoose')

const connectToDataBase = async () => {
  try {
    await mongoose.connect(dbUrl, {});
    console.log("conexion a mongoDB exitosa");
  } catch (err) {
    console.log("error al conectar con mongoDB", err);
  }
};

module.exports = connectToDataBase;