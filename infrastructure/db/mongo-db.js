const mongoose = require("mongoose")
const dotenv = require("dotenv")
const logger = require("../../application/logger")

dotenv.config()

function connect() {
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;

    mongoose.connect(uri)
    .then(() => logger.debug("MongoDB connected"))
    .catch(err => logger.error("Connection error:", err));
}

function disconnect() {
    mongoose.disconnect()
    .then(() => logger.debug("MongoDB disconnected"))
    .catch(err => logger.error("Error disconnecting from MongoDB:", err))
}

module.exports = { connect, disconnect }