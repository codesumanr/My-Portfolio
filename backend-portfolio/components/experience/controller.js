const experienceModel = require("./model");

const listExperiences = async (request, response) => {
    try {
        let experienceData = await experienceModel.getExperiences();

        if (!experienceData.length) {
            await experienceModel.initializeExperiences();
            experienceData = await experienceModel.getExperiences();
        }

        response.status(200).json({ success: true, data: experienceData });
    } catch (error) {
        console.error("Error fetching experiences:", error);
        response.status(500).json({ success: false, message: "Error fetching experiences" });
    }
};

const addNewExperience = async (request, response) => {
    try {
        const result = await experienceModel.addExperience(
            request.body.title,
            request.body.company,
            request.body.location,
            request.body.startDate,
            request.body.endDate,
            request.body.description,
            request.body.skills
        );

        console.log("New experience added:", result);
        response.status(201).json({ success: true, message: "Experience added", data: result });
    } catch (error) {
        console.error("Error adding experience:", error);
        response.status(500).json({ success: false, message: "Error adding experience" });
    }
};

const deleteExperienceById = async (request, response) => {
    try {
        const id = request.query.expId;
        await experienceModel.deleteExperience(id);
        console.log("Experience deleted with ID:", id);
        response.status(200).json({ success: true, message: "Experience deleted" });
    } catch (error) {
        console.error("Error deleting experience:", error);
        response.status(500).json({ success: false, message: "Error deleting experience" });
    }
};

const updateExperience = async (request, response) => {
    try {
        const { expId, title, company, location, startDate, endDate, description, skills } = request.body;

        // Ensure that all required fields are provided
        if (!expId || !title || !company || !location || !startDate || !endDate || !description) {
            return response.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Update experience in the database
        const updatedExperience = await experienceModel.updateExperience(
            expId,
            title,
            company,
            location,
            startDate,
            endDate,
            description,
            skills
        );

        // If no experience was found with the given ID, send an error
        if (!updatedExperience) {
            return response.status(404).json({ success: false, message: "Experience not found" });
        }

        // Send back the updated experience
        response.status(200).json({ success: true, message: "Experience updated successfully", data: updatedExperience });
    } catch (error) {
        console.error("Error updating experience:", error);
        response.status(500).json({ success: false, message: "Error updating experience" });
    }
};

module.exports = {
    listExperiences,
    addNewExperience,
    deleteExperienceById,
    updateExperience
};
