// components/projects/controller.js
const projectModel = require("./model");

// --- Get All Projects ---
const listProjects = async (request, response, next) => {
    try {
        console.log("Controller: Request received for listProjects");
        let projectData = await projectModel.getProject();

        // Initialization logic (consider moving this elsewhere)
        if (!projectData || !projectData.length) {
            console.log("Controller: No project data found, attempting initialization...");
            await projectModel.initializeProject();
            projectData = await projectModel.getProject();
            console.log("Controller: Data after initialization attempt:", projectData?.length);
        }

        // Log data before sending (for debugging)
        // console.log("Controller: Data being sent to frontend:", JSON.stringify(projectData, null, 2));

        response.status(200).json({
            success: true,
            count: projectData?.length || 0,
            projects: projectData || []
        });

    } catch (error) {
        console.error("!!! Error in listProjects controller:", error);
        response.status(500).json({ success: false, message: "Error fetching projects" });
    }
};

// --- Add New Project ---
const addNewProject = async (request, response, next) => {
     try {
        console.log("Controller: Request received for addNewProject");
        const { name, description, projectUrl, githubUrl, techStack } = request.body;

        if (!name || !description || !techStack) {
            return response.status(400).json({ success: false, message: "Missing required fields (name, description, techStack)" });
        }

        const imageBuffer = request.file ? request.file.buffer : null;
        const imageType = request.file ? request.file.mimetype : null;

        const techStackArray = Array.isArray(techStack)
            ? techStack
            : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()).filter(s => s) : []);

        const result = await projectModel.addProject(
            name, description, imageBuffer, imageType, projectUrl, githubUrl, techStackArray
        );

        response.status(201).json({ success: true, message: "Project added successfully", project: result });
    } catch (error) {
        console.error("!!! Error in addNewProject controller:", error);
        response.status(500).json({ success: false, message: "Error adding project" });
    }
};

// --- Delete Project By ID ---
const deleteProjectById = async (request, response, next) => {
    try {
        console.log("Controller: Request received for deleteProjectById");
        // Recommend using path parameter: router.delete('/delete/:id', ...) -> const { id } = request.params;
        const { projId } = request.query; // Using query based on your routes.js
        if (!projId) {
             return response.status(400).json({ success: false, message: "Project ID (projId) is required in query string" });
        }

        await projectModel.deleteProject(projId);

        response.status(200).json({ success: true, message: `Project with ID ${projId} deleted successfully` });
    } catch (error) {
        console.error("!!! Error in deleteProjectById controller:", error);
        if (error.name === 'CastError') {
             return response.status(400).json({ success: false, message: "Invalid Project ID format" });
        }
        response.status(500).json({ success: false, message: "Error deleting project" });
    }
};

// --- Update Project By ID ---
const updateProjectById = async (request, response, next) => {
    try {
        console.log("Controller: Request received for updateProjectById");
        // Recommend using path parameter: router.put('/update/:id', ...) -> const { id } = request.params;
        const { projId } = request.query; // Using query based on your routes.js
        const { name, description, projectUrl, githubUrl, techStack } = request.body;

         if (!projId) {
             return response.status(400).json({ success: false, message: "Project ID (projId) is required in query string" });
        }

        const imageBuffer = request.file ? request.file.buffer : null;
        const imageType = request.file ? request.file.mimetype : null;

        // Process techStack only if provided in the request body
        let techStackArray;
        if (techStack !== undefined) {
             techStackArray = Array.isArray(techStack)
            ? techStack
            : (typeof techStack === 'string' ? techStack.split(',').map(s => s.trim()).filter(s => s) : []);
        }
         // else techStackArray remains undefined, model won't update it


        const updatedProject = await projectModel.updateProject(
            projId, name, description, imageBuffer, imageType, projectUrl, githubUrl, techStackArray
        );

        if (updatedProject) {
            response.status(200).json({ success: true, message: "Project updated successfully", project: updatedProject });
        } else {
            response.status(404).json({ success: false, message: `Project with ID ${projId} not found` });
        }
    } catch (error) {
        console.error("!!! Error in updateProjectById controller:", error);
         if (error.name === 'CastError') {
             return response.status(400).json({ success: false, message: "Invalid Project ID format" });
        }
        response.status(500).json({ success: false, message: "Error updating project" });
    }
};


// Ensure ALL functions are exported
module.exports = {
    listProjects,
    addNewProject,
    deleteProjectById,
    updateProjectById,
};