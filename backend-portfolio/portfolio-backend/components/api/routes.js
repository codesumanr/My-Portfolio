const express = require("express");
const router = express.Router();
const skillModel = require("../skills/model");
const projectModel = require("../projects/model");
const experienceModel = require("../experience/model");

// Get all skills
router.get("/skills", async (req, res) => {
    try {
        const skills = await skillModel.getSkills();
        res.json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ error: "Failed to fetch skills" });
    }
});

// Get all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await projectModel.getProject();
        res.json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// Get all experiences
router.get("/experiences", async (req, res) => {
    try {
        const experiences = await experienceModel.getExperiences();
        res.json(experiences);
    } catch (error) {
        console.error("Error fetching experiences:", error);
        res.status(500).json({ error: "Failed to fetch experiences" });
    }
});

// Add Portfolio Information endpoint
router.get("/portfolio-info", (req, res) => {
    const portfolioInfo = {
        name: "Suman Rani",
        role: "Java Developer",
        summary: "Passionate Javadeveloper with expertise in building modern, responsive web applications using the latest technologies.",
        location: "Canada",
        email: "sumankamboj1997@gmail.com@gmail.com",
        github: "https://github.com/codesumanr",
        linkedin: "https://www.linkedin.com/in/suman-r-b60155260"
    };
    res.json(portfolioInfo);
});

module.exports = router;