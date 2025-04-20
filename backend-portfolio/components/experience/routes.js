// const express = require("express");
// const router = express.Router();
// const { listExperiences, showAddForm, addNewExperience, deleteExperienceById } = require("./controller");

// router.get("/list", listExperiences);
// router.get("/add", showAddForm);
// router.post("/add/submit", addNewExperience);
// router.get("/delete/submit", deleteExperienceById);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { listExperiences, addNewExperience, deleteExperienceById, updateExperience } = require("./controller");
const verifyadmin = require("../admin/middleware/verifyadmin");

router.get("/list", listExperiences);
router.post("/add",verifyadmin, addNewExperience);
router.delete("/delete",verifyadmin, deleteExperienceById); 
router.put("/update", verifyadmin, updateExperience); 


module.exports = router;
