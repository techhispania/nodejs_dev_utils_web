const mongodb = require("../infrastructure/db/mongo-db")
const issue_repository = require("../application/repositories/issue-repository")
const constants = require("../application/constants")
const logger = require("../application/logger")

async function store_issue(title, description) {
    logger.debug(`Storing issue in database. title: ${title}`)

    try {
        await mongodb.connect()

        const new_issue = await issue_repository.insert(title, description, constants.ISSUE_STATUS_TO_DO)
        logger.debug(`New issue inserted: ${new_issue}`)
    } catch (err) {
        logger.error(`Unexpected error storing issue in database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}


async function get_all_issues() {
    logger.debug(`Getting all issues stored in database`)

    try {
        await mongodb.connect()

        const issues = await issue_repository.find_all()

        logger.debug(`Found '${issues.length}' issues`)

        const result = issues.map(issue => ({
            _id: issue._id,
            title: issue.title,
            status: issue.status,
            createdAt: issue.createdAt
        }))
        return result
    } catch (err) {
        logger.error(`Unexpected error getting all issues from database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}


module.exports = { store_issue, get_all_issues }