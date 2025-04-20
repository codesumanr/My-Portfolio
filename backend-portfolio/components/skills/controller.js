// components/skills/controller.js
const skillModel = require("./model"); // Import the skill model

// --- Get All Skills ---
const listSkills = async (request, response, next) => {
    try {
        console.log("Controller: Request received for listSkills");
        // Fetch skills using the model function
        let skillData = await skillModel.getSkills();

        // Diagnostic Log: Check the exact data retrieved from the model
        console.log("Controller: Data fetched from model:", JSON.stringify(skillData, null, 2));

        // Send the response
        response.status(200).json({
            success: true,
            count: skillData?.length || 0,
            skills: skillData || [] // Send the array under the 'skills' key
        });

    } catch (error) {
        // Log the error on the server
        console.error("!!! Error in listSkills controller:", error);
        // Send a generic error response to the client
        response.status(500).json({ success: false, message: "Error fetching skills" });
    }
};

// --- Add New Skill ---
const addSkill = async (request, response, next) => {
     try {
        console.log("Controller: Request received for addSkill");
        const { name, level } = request.body; // Get skill-specific fields

        // Basic validation - name is required by the schema
        if (!name) {
            return response.status(400).json({ success: false, message: "Missing required field: name" });
        }

        // Call the model function to add the skill
        const result = await skillModel.addSkill(name, level);

        response.status(201).json({ success: true, message: "Skill added successfully", skill: result });

    } catch (error) {
        console.error("!!! Error in addSkill controller:", error);
        // Handle specific known errors (like duplicate key)
        if (error.statusCode === 409) { // Check for custom 409 error set in model
             return response.status(409).json({ success: false, message: error.message });
        }
         if (error.name === 'ValidationError') { // Mongoose validation error
             return response.status(400).json({ success: false, message: error.message });
         }
        // Generic server error for unexpected issues
        response.status(500).json({ success: false, message: "Error adding skill" });
    }
};

// --- Delete Skill By ID ---
const deleteSkillById = async (request, response, next) => {
    try {
        console.log("Controller: Request received for deleteSkillById");
        const { id } = request.params; // Get ID from route parameters (e.g., /api/skills/:id)

        if (!id) {
             return response.status(400).json({ success: false, message: "Skill ID is required in the URL path" });
        }

        // Call model function; it returns true if deleted, false if not found
        const deleted = await skillModel.deleteSkill(id);

        if (deleted) {
            // Send success message (or use 204 No Content)
            response.status(200).json({ success: true, message: `Skill with ID ${id} deleted successfully` });
        } else {
             // Skill with that ID wasn't found in the DB
             response.status(404).json({ success: false, message: `Skill with ID ${id} not found` });
        }

    } catch (error) {
        console.error("!!! Error in deleteSkillById controller:", error);
        if (error.name === 'CastError') { // Handle invalid ObjectId format
             return response.status(400).json({ success: false, message: "Invalid Skill ID format" });
        }
        response.status(500).json({ success: false, message: "Error deleting skill" });
    }
};

// --- Update Skill By ID ---
const updateSkillById = async (request, response, next) => {
    try {
        console.log("Controller: Request received for updateSkillById");
        const { id } = request.params; // Get ID from route parameters
        const { name, level } = request.body; // Get fields to update from body

        if (!id) {
             return response.status(400).json({ success: false, message: "Skill ID is required in the URL path" });
        }

        // Optional: Prevent sending empty updates
        if (name === undefined && level === undefined) {
             return response.status(400).json({ success: false, message: "No update data provided (name or level required)" });
        }

        // Call model function; it returns the updated document or null if not found
        const updatedSkill = await skillModel.updateSkill(id, name, level);

        if (updatedSkill) {
             // Found and updated the skill
            response.status(200).json({ success: true, message: "Skill updated successfully", skill: updatedSkill });
        } else {
            // updateSkill returned null, meaning the ID wasn't found
            response.status(404).json({ success: false, message: `Skill with ID ${id} not found` });
        }
    } catch (error) {
        console.error("!!! Error in updateSkillById controller:", error);
        if (error.name === 'CastError') { // Invalid ID format
             return response.status(400).json({ success: false, message: "Invalid Skill ID format" });
        }
        if (error.statusCode === 409) { // Duplicate name error from model
             return response.status(409).json({ success: false, message: error.message });
        }
        if (error.name === 'ValidationError') { // Mongoose validation error during update
             return response.status(400).json({ success: false, message: error.message });
         }
        // Generic server error
        response.status(500).json({ success: false, message: "Error updating skill" });
    }
};

// Export all functions to be used by routes
module.exports = {
    listSkills,
    addSkill,
    deleteSkillById,
    updateSkillById,
};