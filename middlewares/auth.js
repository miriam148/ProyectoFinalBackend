// ESTE ARCHIVO ES PARA VERIFICAR EL TOKEN
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Acceso denegado");
    try {
      const payload = jwt.verify(token, process.env.ACCESS_SECRET);
      req.payload = payload;
      next();
    } catch (error) {
      try {
        const payload = jwt.verify(token, process.env.REFRESH_SECRET);
        req.payload = payload;
        next();
      } catch (error) {
        res.status(400).send({msg: "Token caducado o no válido",error: error.message});
      }
    }
  };


  module.exports = { verifyToken}