const mongoose = require("mongoose");
// REMOVE: const db = require("../../db"); // No longer need to call connect from here

const ExperienceSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    startDate: String, // Consider using Date type for better querying/sorting
    endDate: String,   // Consider using Date type, or String like "Present"
    description: String,
    skills: [String] // Array of strings
});

const Experience = mongoose.model("Experience", ExperienceSchema);

// --- Initialization Function ---
async function initializeExperiences() {
    const experienceData = [
        {
            title: "Software Developer",
            company: "Reality AI Lab.", // Check for typos like the double dot?
            location: "San Francisco,USA",
            startDate: "May 2025",
            endDate: "Present", // Consistent casing? "July"
            description: "Collaborating with the team on AI-powered educational tools such as Marvel AI and Sky AI.",
            skills: ["React", "Node.js", "MongoDB", "Spring Boot", "JavaScript", "Google Gemini", "REST APIs", "Git", "Postman", "AI Integration"]
        },
        {
            title: "Java Developer",
            company: "Zork Tech inc..", // Check for typos like the double dot?
            location: "Mohali",
            startDate: "June 2023",
            endDate: "july 2024", // Consistent casing? "July"
            description: "Developed and maintained client websites using modern web technologies.",
            skills: ["React", "Node.js", "MongoDB"]
        },
        {
            title: "Project Coordinator",
            company: "Zork Tech inc.",
            location: "Mohali",
            startDate: "June 2020",
            endDate: "December 2021",
            description: "Assisted in developing web applications and gained experience in full-stack development.",
            skills: ["JavaScript", "HTML", "CSS", "PHP"]
        },
        {
            title: "Math Tutor",
            company: "M.M.PG. College.",
            location: "Sirsa",
            startDate: "March 2019",
            endDate: "July 2021",
            description: "Provided peer-to-peer academic  support as aMath Tutor, assisting college students in understanding complex mathematical concepts.",
            skills: ["Problem-Solving", "Critical Thinking", "Leadership", "Subject Mastery"]
        }
    ];

    try {
        console.log("Attempting to clear existing experiences...");
        await Experience.deleteMany({}); // Clear existing experiences
        console.log("Attempting to insert initial experiences...");
        const result = await Experience.insertMany(experienceData);
        console.log("Experiences initialized successfully:", result.length);
    } catch (error) {
        console.error("!!! Error during experience initialization:", error);
        throw error; // Re-throw for controller to handle
    }
}

// --- Get All Experiences ---
async function getExperiences() {
    try {
        // REMOVED: await db.connect();
        console.log("Model: Attempting Experience.find()...");
        const experiences = await Experience.find({}); // Consider sorting: .sort({ startDate: -1 }) if using Date type
        console.log("Model: Fetched Experiences count:", experiences.length);
        return experiences;
    } catch (error) {
        console.error("!!! Error in model getExperiences:", error);
        throw error; // Let controller handle the response
    }
}

// --- Add New Experience ---
async function addExperience(title, company, location, startDate, endDate, description, skills) {
    try {
        // REMOVED: await db.connect();
        console.log("Model: Attempting to create new Experience...");
        const processedSkills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
        const newExperience = new Experience({
            title,
            company,
            location,
            startDate,
            endDate,
            description,
            skills: processedSkills // Use processed skills
        });
        const result = await newExperience.save();
        console.log("Model: New Experience Added:", result._id);
        return result;
    } catch (error) {
        console.error("!!! Error in model addExperience:", error);
        throw error;
    }
}

// --- Delete Experience ---
async function deleteExperience(id) {
    try {
        // REMOVED: await db.connect();
        console.log("Model: Attempting to delete Experience with ID:", id);
        const result = await Experience.deleteOne({ _id: id });
        console.log("Model: Delete result:", result);
        // No return needed unless controller checks result.deletedCount
    } catch (error) {
        console.error("!!! Error in model deleteExperience:", error);
        throw error;
    }
}

// --- Update Experience ---
async function updateExperience(expId, title, company, location, startDate, endDate, description, skills) {
    try {
        // REMOVED: await db.connect();
        console.log("Model: Attempting to update Experience with ID:", expId);
        const processedSkills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
        const updatedExperience = await Experience.findByIdAndUpdate(
            expId,
            { title, company, location, startDate, endDate, description, skills: processedSkills },
            { new: true } // Return the updated document
        );
        console.log("Model: Updated Experience:", updatedExperience ? updatedExperience._id : 'Not Found');
        return updatedExperience; // Will be null if not found
    } catch (error) {
        console.error("!!! Error in model updateExperience:", error);
        throw error;
    }
}

module.exports = {
    initializeExperiences,
    getExperiences,
    addExperience,
    deleteExperience,
    updateExperience
};
