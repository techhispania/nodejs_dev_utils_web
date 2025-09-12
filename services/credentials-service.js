const mongodb = require("../infrastructure/db/mongo-db")
const credential_repository = require("../application/repositories/credential-repository")
const encryption = require("../application/encryption")
const logger = require("../application/logger")

async function store_credential(application_name, username, password) {
    logger.debug(`Storing credentials in database. application_name: ${application_name}, username: ${username}, password: ******`)

    try {
        await mongodb.connect()

        const new_credential = await credential_repository.insert_credential(application_name, username, encryption.encrypt(password))
        logger.debug(`New crendential inserted: ${new_credential}`)
    } catch (err) {
        logger.error(`Unexpected error storing credentials in database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }

}

module.exports = { store_credential }