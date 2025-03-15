const bcrypt = require("bcryptjs");

const { generateToken } = require("../utils/utils.js")
const userModel = require("../models/userModel.js");

const signup = async (req, res) => {
    try {
      const { name, email, password, role, profilePic } = req.body;
      const newUser = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role,
        profilePic
      };
      await userModel.create(newUser);
      res.status(200).send("Usuario creado correctamente");
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(500)
          .send({ status: "Failed", error: "El correo ya existe" });
      }
  
      res.status(500).send({ status: "failed", error: error.message });
    }
  };
  
  const login = async (req, res) => {
      try {
        const { email, password } = req.body;
    
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return res.status(404).send("Usuario o contraseña no validos");
        }
    
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
          return res.status(404).send("Usuario o contraseña no validos");
        }
    
        // npm i jsonwebtoken
        const payload = {
          _id: user._id,
          name: user.name,
          role: user.role,
        };
    
        const token = generateToken(payload,false);
        const token_refresh = generateToken(payload,true);
    
        res.status(200).send({user,token, token_refresh});
      } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
      }
    };
    


    const refreshToken = (req,res) => {
      try {
        const payload = {
          _id: req.payload._id,
          name: req.payload.name,
          role: req.payload.role,
        }
        const token = generateToken(payload,false);
        const token_refresh = generateToken(payload,true);
        res.status(200).send({token, token_refresh});
      } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
      }
    }
  
  
  
  module.exports = { signup, login, refreshToken};