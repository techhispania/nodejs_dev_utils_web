const mongodb = require("../infrastructure/db/mongo-db")
const issue_repository = require("../application/repositories/issue-repository")
const logger = require("../application/logger")

async function store_issue(title, description) {
    logger.debug(`Storing issue in database. title: ${title}`)

    try {
        await mongodb.connect()

        const new_issue = await issue_repository.insert_issue(title, description)
        logger.debug(`New issue inserted: ${new_issue}`)
    } catch (err) {
        logger.error(`Unexpected error storing issue in database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}

module.exports = { store_issue }