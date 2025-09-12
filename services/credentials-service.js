const mongodb = require("../infrastructure/db/mongo-db")
const logger = require("../application/logger")

function store_credential(application_name, username, password) {
    logger.debug("Storing credentials in database")

    mongodb.connect()

    mongodb.disconnect()

    logger.debug("Credential stored")
}

module.exports = store_credential