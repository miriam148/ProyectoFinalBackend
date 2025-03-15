const userModel = require("../models/userModel")

const addUser = async (req, res) => {
    try {
        const userData = req.body
        await userModel.create(userData)
        res.status(200).send("El usuario se ha creado correctamente")
         } catch (error) {
        res.status(500).send({
            status: 'failed', error: error.message})
    }
}


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

const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find(); // Aquí debería ser la consulta correcta a la base de datos
        res.json(users);
    } catch (error) {
        res.status(500).send({ status: 'failed', error: error.message })

    }
}

module.exports = {  addUser, deleteUser, updateUser, getById, getAllUsers }

