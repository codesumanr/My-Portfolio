// components/projects/model.js
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: Buffer,
    imageType: String,
    projectUrl: String,
    githubUrl: String,
    techStack: { type: [String], default: [] } // Ensure array with default
});

const Project = mongoose.model("Project", ProjectSchema);

// --- Initialization Function ---
async function initializeProject() {
    const projectData = [
        {
           
    name: "Digital Bookshelf",
  description: "A modern MERN-stack web application that allows users to explore, organize, and read books in one centralized platform. Integrated with the Open Library API, it features book search, categorized views, user login, favorites, and a clean responsive UI.",
  projectUrl: "https://example.com/digital-bookshelf",
  githubUrl: "https://github.com/codesumanr/Digitial-Bookshelf",
  techStack: ["MongoDB", "Express.js", "React", "Node.js", "Open Library API"]

        },
        {
  name: "DanceLover",
  description: "An interactive platform designed to connect dance enthusiasts with nearby dance studios using Google Maps integration. It also features curated dance videos from YouTube, allowing users to learn and get inspired from top dancers around the world.",
  projectUrl: "https://example.com/dancelover",
  githubUrl: "https://github.com/codesumanr/DanceLover",
  techStack: ["Node.js", "Express.js", "MongoDB", "Pug", "Google Maps API", "YouTube API"]


        },
        {
  name: "Library Management System",
  description: "A lightweight web application that enables librarians to manage book inventory, borrowers, and lending operations efficiently. Designed for simplicity and usability, the system provides real-time updates and clean UI for fast interactions.",
  projectUrl: "https://example.com/library-system",
  githubUrl: "https://github.com/codesumanr/librarysystem",
  techStack: ["HTML", "CSS", "JavaScript", "jQuery"]


        }
    ];

    try {
        console.log("Attempting to clear existing projects...");
        await Project.deleteMany({});
        console.log("Attempting to insert initial projects...");
        const result = await Project.insertMany(projectData);
        console.log("Projects initialized successfully:", result.length);
    } catch (error) {
        console.error("!!! Error during project initialization:", error);
        throw error; // Re-throw for controller
    }
}

// --- Get All Projects ---
async function getProject() {
    try {
        console.log("Model: Attempting Project.find()...");
        const projects = await Project.find({});
        console.log("Model: Fetched Projects count:", projects.length);
        return projects;
    } catch (error) {
        console.error("!!! Error in model getProject:", error);
        throw error; // Let controller handle the response
    }
}

// --- Add New Project ---
async function addProject(name, description, imageBuffer, imageType, projectUrl, githubUrl, techStack) {
     try {
        console.log("Model: Attempting to create new Project...");
        const newProject = new Project({
            name,
            description,
            image: imageBuffer, // Mongoose handles Buffer type
            imageType,
            projectUrl,
            githubUrl,
            techStack
        });
        const result = await newProject.save();
        console.log("Model: New Project Added:", result._id);
        return result;
    } catch (error) {
        console.error("!!! Error in model addProject:", error);
        throw error;
    }
}

// --- Delete Project ---
async function deleteProject(id) {
    try {
        console.log("Model: Attempting to delete Project with ID:", id);
        const result = await Project.deleteOne({ _id: id });
        console.log("Model: Delete result:", result);
        if (result.deletedCount === 0) {
             console.warn(`Model: Project with ID ${id} not found for deletion.`);
             // Optionally throw an error if project not found is critical
             // throw new Error(`Project with ID ${id} not found`);
        }
    } catch (error) {
        console.error("!!! Error in model deleteProject:", error);
        throw error;
    }
}

// --- Update Project ---
async function updateProject(id, name, description, imageBuffer, imageType, projectUrl, githubUrl, techStack) {
    try {
        console.log("Model: Attempting to update Project with ID:", id);

        const updateData = {};
        // Only add fields to updateData if they are provided (not undefined)
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (projectUrl !== undefined) updateData.projectUrl = projectUrl;
        if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
        if (techStack !== undefined) updateData.techStack = techStack; // Assume techStack is already processed array
        if (imageBuffer) { // Only update image if a new one was uploaded
            updateData.image = imageBuffer;
            updateData.imageType = imageType;
        }
        // To remove an image, you might need specific logic, e.g., setting image/imageType to null if requested

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { $set: updateData }, // Use $set to update only provided fields
            { new: true, runValidators: true } // Return updated doc, run schema validators
        );

        console.log("Model: Updated Project:", updatedProject ? updatedProject._id : 'Not Found');
        return updatedProject; // Will be null if ID not found
    } catch (error) {
        console.error("!!! Error in model updateProject:", error);
        throw error;
    }
}


module.exports = {
    initializeProject,
    getProject,
    addProject,
    deleteProject,
    updateProject
};
