const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" }, // Foto de perfil opcional, no la uso en esta apli
  role: { type: String, default: "user" }, //todos de momento serán user
  birthdate: { type: Date, required: true },
  isAdventurous: { type: Boolean },
  postcode: {type: Number }

});

const userModel = mongoose.model('User', UserSchema, "user");
module.exports = userModel
