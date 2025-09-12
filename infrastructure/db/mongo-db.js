const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

function connect() {
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

    mongoose.connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("Connection error:", err));
}

module.exports = connect