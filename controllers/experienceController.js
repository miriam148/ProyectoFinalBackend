const experienceModel = require("../models/experienceModel")


// Obtener todas las experincias
exports.getExperience = async (req, res) => {
    try {
      const experience = await experienceModel.find().populate("user", "name");
      res.json(experience);
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
  
  // Crear experiencia (solo usuario autenticado)
  exports.createExperience = async (req, res) => {
    const { title, description, location, image } = req.body;
  
    try {
      const newExperience = new experienceModel({ user: req.payload._id, title, description, location, image });
      await newExperience.save();
      res.status(201).json(newExperience);
    } catch (error) {
      res.status(500).json({ msg: "Error al crear experiencia" });
    }
  };
  
  // Obtener por id
  exports.getExperienceById = async (req, res) => {
    try {
      const experience = await experienceModel.findById(req.params.id);
      if (!experience) return res.status(404).json({ msg: "Experiencia no encontrada" });
      res.json(experience);
    } catch (error) {
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
  
  // Actualizar experiencia (solo el dueño puede hacerlo)
  exports.updateExperience = async (req, res) => {
    try {
        console.log("ID de experiencia a actualizar:", req.params.id);
        console.log("Usuario autenticado:", req.payload); // 📌 Verifica el usuario autenticado
  
        const experience = await experienceModel.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ msg: "Experiencia no encontrada" });
        }
  
        // Verificar si el usuario autenticado es el dueño de la experiencia
        if (experience.user.toString() !== req.payload._id) {
            return res.status(403).json({ msg: "No tienes permiso para modificar esta experiencia" });
        }
  
        const updatedExperience = await experienceModel.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );
  
        res.json(updatedExperience);
    } catch (error) {
        console.error("❌ Error al actualizar experiencia:", error);
        res.status(500).json({ msg: "Error al actualizar la experiencia", error: error.message });
    }
  };
  

//
exports.deleteExperience = async (req, res) => {
  try {
      console.log("ID de la experiencia a eliminar:", req.params.id); // 📌 Verifica el ID recibido
      console.log("Usuario autenticado:", req.payload); // 📌 Verifica qué usuario está autenticado

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
      console.error("❌ Error al eliminar experiencia:", error); // 📌 Verifica errores en consola
      res.status(500).json({ msg: "Error al eliminar la experiencia", error: error.message });
  }
};
