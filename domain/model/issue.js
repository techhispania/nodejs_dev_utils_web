const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true }
}, { timestamps: true });

// "Issue" will map to "issues" collection in MongoDB
const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
