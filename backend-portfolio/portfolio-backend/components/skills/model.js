// components/skills/model.js
const mongoose = require("mongoose");

// --- Skill Schema Definition ---
const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required.'], // Added custom error message
        trim: true,      // Remove leading/trailing whitespace
        unique: true     // Ensure skill names are unique
    },
    level: {
        type: String,
        trim: true,
        // Optional: You could enforce specific values using an enum
        // enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    // Optional: Add a category if you want to group skills
    // category: {
    //     type: String,
    //     trim: true
    // }
    // Optional: Add a timestamp for when the skill was added/updated
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
});

// Optional: Add a pre-save hook to update the 'updatedAt' field on changes
// SkillSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });
// SkillSchema.pre('findOneAndUpdate', function(next) {
//   this.set({ updatedAt: Date.now() });
//   next();
// });


const Skill = mongoose.model("Skill", SkillSchema);

// --- Initialization Function ---
async function initializeSkills() {
    // Sample initial skills data
    const skillData = [
        { name: "JavaScript", level: "Advanced" },
        { name: "React", level: "Intermediate" },
        { name: "Node.js", level: "Intermediate" },
        { name: "HTML5", level: "Advanced" },
        { name: "CSS3", level: "Advanced" },
        { name: "MongoDB", level: "Intermediate" },
        { name: "Express.js", level: "Intermediate" },
        { name: "Git", level: "Advanced" },
        { name: "REST APIs", level: "Advanced" },
        { name: "Problem Solving", level: "Expert" },
        { name: "Communication", level: "Expert" },
        // Add more skills as needed
    ];

    try {
        console.log("Attempting to clear existing skills...");
        // Using deleteMany({}) is fine, but checking count can be slightly safer
        const count = await Skill.countDocuments();
        if (count > 0) {
            await Skill.deleteMany({});
            console.log("Existing skills cleared.");
        } else {
            console.log("No existing skills to clear.");
        }

        console.log("Attempting to insert initial skills...");
        // Using insertMany with ordered: false allows inserting valid ones even if some fail (e.g., duplicates)
        const result = await Skill.insertMany(skillData, { ordered: false }).catch(err => {
             // Handle potential duplicate key errors during seeding if needed,
             // especially if re-running initialization without clearing.
             if (err.code === 11000) { // MongoDB duplicate key error code
                console.warn("Warning during skill initialization: Some skills might already exist (duplicate keys).", err.writeErrors?.length || 0, "duplicates ignored.");
                return err.result; // Return partial result if available
             }
             throw err; // Re-throw other errors
        });
        const insertedCount = result.insertedCount || (result.result ? result.result.nInserted : 0); // Adjust based on Mongoose/driver version
        console.log("Skills initialized successfully:", insertedCount);
    } catch (error) {
         // Catch errors not related to duplicates during insertMany
        if (error.code !== 11000) {
             console.error("!!! Error during skill initialization:", error);
             throw error; // Re-throw critical errors
        }
    }
}

// --- Get All Skills ---
async function getSkills() {
    try {
        console.log("Model: Attempting Skill.find()...");
        // Optionally sort skills alphabetically
        const skills = await Skill.find({}).sort({ name: 1 });
        console.log("Model: Fetched Skills count:", skills.length);
        return skills;
    } catch (error) {
        console.error("!!! Error in model getSkills:", error);
        throw error; // Re-throw the error to be handled by the controller
    }
}

// --- Add New Skill ---
// Parameters match the schema fields intended for creation
async function addSkill(name, level) {
    try {
        console.log("Model: Attempting to create new Skill...");
        const newSkill = new Skill({
            name, // Name is required by schema
            level // Level is optional
            // category // Add if you included category in the schema
        });
        const result = await newSkill.save(); // save() triggers validation
        console.log("Model: New Skill Added:", result.name, result._id);
        return result;
    } catch (error) {
        console.error("!!! Error in model addSkill:", error);
        // Check for duplicate key error (code 11000)
        if (error.code === 11000) {
            // Create a more specific error object or message
             const customError = new Error(`Skill with name "${name}" already exists.`);
             customError.statusCode = 409; // Conflict status code
             throw customError;
        }
        throw error; // Re-throw other errors
    }
}

// --- Delete Skill ---
async function deleteSkill(id) {
    try {
        console.log("Model: Attempting to delete Skill with ID:", id);
        // findByIdAndDelete is often preferred as it finds and deletes in one step
        const result = await Skill.findByIdAndDelete(id);
        // console.log("Model: Delete Skill result:", result); // result is the deleted document or null

        if (result) {
            console.log(`Model: Skill "${result.name}" deleted successfully.`);
            return true; // Indicate success
        } else {
            console.warn(`Model: Skill with ID ${id} not found for deletion.`);
            return false; // Indicate not found
        }
    } catch (error) {
        console.error("!!! Error in model deleteSkill:", error);
        throw error;
    }
}

// --- Update Skill ---
// Parameters: id and the fields to potentially update
async function updateSkill(id, name, level) {
    try {
        console.log("Model: Attempting to update Skill with ID:", id);

        // Build an update object containing only the fields that are provided
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (level !== undefined) updateData.level = level;
        // if (category !== undefined) updateData.category = category; // If using category

        // Check if there's anything to update
        if (Object.keys(updateData).length === 0) {
             console.log("Model: No update data provided for Skill ID:", id);
             // Return the existing skill data or null/error based on desired behavior
             return await Skill.findById(id); // Example: return current data
             // Or: throw new Error("No update data provided.");
        }

        // Find by ID and update, run validators, return the *new* updated document
        const updatedSkill = await Skill.findByIdAndUpdate(
            id,
            { $set: updateData }, // Use $set to update only provided fields
            { new: true, runValidators: true } // Options: return updated doc, run schema validators
        );

        if (updatedSkill) {
             console.log("Model: Updated Skill:", updatedSkill.name, updatedSkill._id);
        } else {
             console.log("Model: Skill not found for update with ID:", id);
        }

        return updatedSkill; // Return the updated document or null if not found
    } catch (error) {
        console.error("!!! Error in model updateSkill:", error);
         // Check for duplicate key error if name is being updated
        if (error.code === 11000 && name !== undefined) {
            const customError = new Error(`Another skill with the name "${name}" already exists.`);
            customError.statusCode = 409; // Conflict
            throw customError;
        }
        throw error; // Re-throw other errors
    }
}

module.exports = {
    initializeSkills,
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill,
    // Optionally export the model itself if needed elsewhere
    // Skill
};