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

/**
 * This function return all the credentials stored in database
 * But it only returns the _id and the application_name, not the 
 * user or password.
 * @returns credentials identifiers
 */
async function get_all_credentials() {
    logger.debug(`Getting all credentials stored in database`)

    try {
        await mongodb.connect()

        const credentials = await credential_repository.find_all()

        logger.debug(`Found '${credentials.length}' credentials`)

        const result = credentials.map(credential => ({
            _id: credential._id,
            application_name: credential.application_name
        }))
        return result
    } catch (err) {
        logger.error(`Unexpected error getting all credentials from database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}

async function get_credential(id) {
    logger.debug(`Getting credential for id ${id}`)

    try {
        await mongodb.connect()

        const credential = await credential_repository.find_by_id(id)

        credential.password = encryption.decrypt(credential.password)
        return credential
    } catch (err) {
        logger.error(`Unexpected error getting credential of id ${id}: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}

module.exports = { store_credential, get_all_credentials, get_credential }