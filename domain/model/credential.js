const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
    application_name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// "Credential" will map to "credentials" collection in MongoDB
const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;
