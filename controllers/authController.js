const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/utils.js")
const userModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');/*probando a cambiar refreshtoken sin pasar en la ruta verifytoken pq ya esta caducado
tengo que hacer funcion nueva de refresh e importar jwt aqui*/


//Función registrar usuario
const signup = async (req, res) => {
    try {
      const { name, email, password, profilePic, role, birthdate, isAdventurous, postcode } = req.body;
       // Validación de contraseña con regex
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "Failed",
        error: "La contraseña debe tener al menos 1 mayúscula, 1 número y mínimo 5 caracteres.",
      });
    }
      const newUser = {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        profilePic,
        role,
        birthdate,
        isAdventurous,
        postcode
      };
      await userModel.create(newUser);
      res.status(200).json("Usuario creado correctamente");
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(500)
          .json({ status: "Failed", error: "El correo ya existe" });
      }
  
      res.status(500).json({ status: "failed", error: error.message });
    }
  };


  //Función loguearte
  const login = async (req, res) => {
      try {
        const { email, password } = req.body;
    
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ message: "Usuario o contraseña no válidos"});
        }
    
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
          return res.status(404).json({ message: "Usuario o contraseña no válidos"}); //si pongo .send me devuelve texto plano res.json me devuelve objeto
        }
    
        // npm i jsonwebtoken
        const payload = {
          _id: user._id,
          name: user.name,
          role: user.role, 
        };
    
        const token = generateToken(payload,false);
        const token_refresh = generateToken(payload,true);
    
        res.status(200).send({user,token, token_refresh}); //en el front en login tambien meto user, token, refresh_token 
      } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
      }
    };
    

/*NUEVA FUNCION PROBANDO SI FUNCIONA VERIFYTOKEN */ 


const refreshToken = (req, res) => {
  const { token_refresh } = req.body;  // Recibes el refresh token del front
  if (!token_refresh) {
    return res.status(400).json({ error: "No se proporcionó el refresh token" });
  }

  // Verificas el refresh token usando la REFRESH_SECRET DE.ENV
  jwt.verify(token_refresh, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Refresh token inválido o expirado" });
    }

    // El decoded es el payload original (_id, name, role) estos nombres de propiedades SIEMPRE tienen que coincidir 
    //con las propiedades del payload /CAMBIO PAYLOAD POR DECODED
    const payload = {
      _id: decoded._id,
      name: decoded.name,
      role: decoded.role,
    };

    // Genera nuevos tokens
    const newAccessToken = generateToken(payload, false);
    const newRefreshToken = generateToken(payload, true);

    /*Devuelves los nuevos tokens, este nombre SI TIENE QUE COINCIDIR CON EL FRONT EN DATA, EN EL STORAGE 
    LE PUEDES POPNER OTRO NOMBRE PERO EN EL DATA.TOKEN DATA.TOKEN_REFRESH */
    return res.status(200).json({
      token: newAccessToken,
      token_refresh: newRefreshToken,
    });
  });
};



//Función para cambiar la contraseña
const changePassword = async (req, res) => {
  try {
    
    const { currentPassword, newPassword } = req.body;
    const userId = req.payload._id;

    // Buscar usuario
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Comparar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "La contraseña actual no es correcta" });

    // Hashear nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Contraseña cambiada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar la contraseña" });
  }
};

//(NO LA QUIERO BORRAR POR SI LA NECESITO, SIGO COMPROBANDO REFRESH TOKEN!)
/* EN ESTA FUNCION EL PAYLOAD YA NO EXISTE, EXISTE SI LE PASO EL MIDDLEWARE DE VERIFY PERO LO HE QUITADO PQ EL
ACCESS TOKEN YA NO EXISTE POR ESO NO PUEDO PASARLE VERIFY, POR ESO ESTE PAYLOAD ESTA VACIO!!!! O UNDEFINED Y FALLA*/

    // const refreshToken = (req,res) => {
    //   try {
    //     const payload = {
    //       _id: req.payload._id,
    //       name: req.payload.name,
    //       role: req.payload.role,
    //     }
    //     const token = generateToken(payload,false);
    //     const token_refresh = generateToken(payload,true);
    //     res.status(200).send({token, token_refresh});
    //   } catch (error) {
    //     res.status(500).send({ status: "Failed", error: error.message });
    //   }
    // }
  
  




    
  
  module.exports = { signup, login, refreshToken, changePassword};