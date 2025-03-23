const userModel = require("../models/userModel")



//Función para eliminar usuario(solo el usuario se puede eliminar)
const deleteUser = async (req, res) => {
    try {
        const idUser = req.params.idUser
        const user = await userModel.findByIdAndDelete(idUser)
        if(!user){
            return res.status(404).send('Usuario no encontrado')
        }
        res.status(200).send('Se ha borrado correctamente')
        
    } catch (error) {
        res.status(500).send({ status: 'failed', error: error.message})
    }
}

//Función para editar perfil usuario 
const updateUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const newUser = req.body;
    const user = await userModel.findByIdAndUpdate(idUser, newUser, {
      new: true,
    });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: 'failed', error: error.message})
  }
};


const getById = async (req, res) => {
    try {
        const idUser = req.payload._id;
        const user = await userModel.findById(idUser);
        if(!user){
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).send(user);
    } catch  (error) {
        res.status(500).send({ status: 'failed', error: error.message })
    }

};




//Función para editar la foto de perfil(solo usuario propietario de la cuenta)
const updateProfilePic = async (req, res) => {
    try {
      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";
      if (!imagePath) return res.status(400).json({ message: "No se subió ninguna imagen" });
  
      const userId = req.payload._id;
  
      const user = await userModel.findByIdAndUpdate(userId, { profilePic: imagePath }, { new: true });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar foto de perfil" });
    }
  };
  



  

module.exports = {   deleteUser, updateUser, getById,  updateProfilePic }

