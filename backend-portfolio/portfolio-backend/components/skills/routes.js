// components/skills/routes.js

const express = require("express");
const router = express.Router(); // Create an Express router instance

// Import controller functions for skills
const {
    listSkills,
    addSkill,
    deleteSkillById,
    updateSkillById
} = require("./controller");

// Import the admin verification middleware
// Adjust the path if your folder structure is different
const verifyadmin = require("../admin/middleware/verifyadmin");

// --- Define Skill Routes ---

// GET /api/skills/list - Get all skills (Publicly accessible)
router.get("/list", listSkills);

// POST /api/skills/add - Add a new skill (Admin only)
router.post("/add", verifyadmin, addSkill);

// DELETE /api/skills/:id - Delete a skill by its ID (Admin only)
// Note: Uses route parameter ':id' consistent with REST practices and the controller
router.delete("/:id", verifyadmin, deleteSkillById);

// PUT /api/skills/:id - Update a skill by its ID (Admin only)
// Note: Uses route parameter ':id' consistent with REST practices and the controller
router.put("/:id", verifyadmin, updateSkillById);


module.exports = router; // Export the router