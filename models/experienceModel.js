const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con User
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: "" }, // Imagen opcional del viaje
  date: { type: Date, default: Date.now }
});

const experienceModel = mongoose.model("Experience", ExperienceSchema, "experience");
module.exports = experienceModel