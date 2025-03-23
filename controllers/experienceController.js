const experienceModel = require("../models/experienceModel")


// Obtener todas las experincias
exports.getExperience = async (req, res) => {
  try {
    const experience = await experienceModel
      .find()
      .populate(
        "user",
        "name"
      ); /*MUY IMPORTANTE USAR POPULATE CUANDO QUEREMOS QUE NOS DEVUELVA EL NOMBRE 
      EN EL FRONT. PQ EN BASE DE DATOS ESTA EL ID DE ESE USUARIO Y NO DEVUELVE NADA*/

    res.json(experience);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
  
  // Crear experiencia (solo usuario autenticado)
  exports.createExperience = async (req, res) => {
    const { title, description, location } = req.body; //EN ESTE DESTRUCTURING IMAGE YA NO VIENE DE REQ.BODY, AHORA LO OBTENEMOS DE REQ.FILE.PATH
  
    try {
      //multer guarda aqui el archivo y esta en req.file.path NO req.body( hago replace \\ pq en mongo me sale / y no me coge foto )
      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : "";

      const newExperience = new experienceModel({ user: req.payload._id,
         title,
         description,
         location,
         image: imagePath}); //AQUI ES DND SE GUARDA LA IMG EN LA BASE DE DATOS
      await newExperience.save();
      res.status(201).json(newExperience);
    } catch (error) {
      res.status(500).json({ msg: "Error al crear experiencia" });
    }
  };
  
  // Obtener por id la experiencia (ver detalle)
  exports.getExperienceById = async (req, res) => {
    console.log("Recibí ID:", req.params.id);
    try {
      const experience = await experienceModel.findById(req.params.id).populate("user", "name");
      if (!experience) return res.status(404).json({ msg: "Experiencia no encontrada" });
      res.json(experience);
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
  
  // Actualizar experiencia (solo el creador puede hacerlo)
  exports.updateExperience = async (req, res) => {
    try {
        console.log("ID de experiencia a actualizar:", req.params.id);
        console.log("Usuario autenticado:", req.payload); //  Verifica el usuario autenticado
  
        const experience = await experienceModel.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ msg: "Experiencia no encontrada" });
        }
  
        // Verificar si el usuario autenticado es el creador de la experiencia
        if (experience.user.toString() !== req.payload._id) {
            return res.status(403).json({ msg: "No tienes permiso para modificar esta experiencia" });
        }
  
        const updatedExperience = await experienceModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
  
        res.json(updatedExperience);
    } catch (error) {
        console.error("Error al actualizar experiencia:", error);
        res.status(500).json({ msg: "Error al actualizar la experiencia", error: error.message });
    }
  };
  

//Eliminar la expereincia( solo creador)
exports.deleteExperience = async (req, res) => {
  try {
      console.log("ID de la experiencia a eliminar:", req.params.id); //Verifica el ID recibido
      console.log("Usuario autenticado:", req.payload); //Verifica qué usuario está autenticado

      const experience = await experienceModel.findById(req.params.id);
      if (!experience) {
          return res.status(404).json({ msg: "Experiencia no encontrada" });
      }

      // Verificar si el usuario autenticado es el dueño de la experiencia
      if (experience.user.toString() !== req.payload._id) {
          return res.status(403).json({ msg: "No tienes permiso para eliminar esta experiencia" });
      }

      await experienceModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Experiencia eliminada correctamente" });
  } catch (error) {
      console.error("Error al eliminar experiencia:", error); //Verifica errores en consola
      res.status(500).json({ msg: "Error al eliminar la experiencia", error: error.message });
  }
};



// Cambiar imagen de experiencia (solo creador)
exports.changeExperienceImage = async (req, res) => {
  try {
    const experienceId = req.params.id;
    const userId = req.payload._id; // Del token

    const experience = await experienceModel.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ msg: "Experiencia no encontrada" });
    }

    // Solo el creador puede cambiar la imagen
    if (experience.user.toString() !== userId) {
      return res.status(403).json({ msg: "No autorizado para cambiar esta imagen" });
    }

    // Cambiar la imagen con la ruta del archivo subido por multer
    experience.image = req.file.path;
    await experience.save();

    res.status(200).json({ msg: "Imagen actualizada con éxito", experience });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la imagen", error: error.message });
  }
};