const express = require('express')
const { getExperience, createExperience, getExperienceById, updateExperience, deleteExperience } = require('../controllers/experienceController')
const { verifyToken } = require("../middlewares/auth")
const router = express.Router()



router.get("/", getExperience);

router.post("/", verifyToken, createExperience);
router.get("/:id", verifyToken, getExperienceById);
router.put("/:id", verifyToken, updateExperience);
router.delete("/:id", verifyToken, deleteExperience);





module.exports = router;