const express = require('express')
const { getExperience, createExperience, getExperienceById, updateExperience, deleteExperience } = require('../controllers/experienceController')
const { verifyToken } = require("../middlewares/auth")
const router = express.Router()
const upload = require('../middlewares/multerConfig')


router.get("/", getExperience);
router.post("/", verifyToken, upload.single('image'), createExperience);
router.get("/:id", verifyToken, getExperienceById);
router.put("/:id", verifyToken, updateExperience);
router.delete("/:id", verifyToken, deleteExperience);

// router.post("/", verifyToken, upload.array('images', 3), createExperience); ESTA ES LA MANERA DE SUBIR MAS DE UNA FOTO EN ESTE CASO 3




module.exports = router;