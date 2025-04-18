// const express = require("express");
// const router = express.Router();

// const { listProject, showAddForm, addNewProject, deleteProjectById } = require("./controller");

// router.get("/list", listProject);
// router.get("/add", showAddForm);
// router.post("/add/submit", addNewProject);
// router.get("/delete/submit", deleteProjectById);

// module.exports = router;

const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
    listProjects,
    addNewProject,
    deleteProjectById,
    updateProjectById
} = require("./controller");
const verifyadmin = require("../admin/middleware/verifyadmin");

const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage: storage });

router.get("/list", listProjects);
router.post("/add", verifyadmin, upload.single('image'), addNewProject);
router.delete("/delete",verifyadmin, deleteProjectById);
router.put("/update", verifyadmin, upload.single('image'), updateProjectById);   

module.exports = router;

