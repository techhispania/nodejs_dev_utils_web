const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }
})

// "Project" will map to "projects" collection in MongoDB
const Project = mongoose.model("Project", projectSchema)

module.exports = Project;
