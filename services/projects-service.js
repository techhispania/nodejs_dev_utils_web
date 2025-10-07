const mongodb = require("../infrastructure/db/mongo-db")
const project_repository = require("../application/repositories/project-repository")
const logger = require("../application/logger")

async function store_project(name) {
    logger.debug(`Storing project in database. name: ${name}`)

    try {
        await mongodb.connect()

        const new_project = await project_repository.insert(name)
        logger.debug(`New project inserted: ${new_project}`)
    } catch (err) {
        logger.error(`Unexpected error storing project in database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}


async function get_all_projects() {
    logger.debug(`Getting all projects stored in database`)

    try {
        await mongodb.connect()

        const projects = await project_repository.find_all()

        logger.debug(`Found '${projects.length}' projects`)

        const result = projects.map(project => ({
            _id: project._id,
            name: project.name
        }))
        return result
    } catch (err) {
        logger.error(`Unexpected error getting all projects from database: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}

async function delete_project(id) {
    logger.debug(`Deleting project for id ${id}`)

    try {
        await mongodb.connect()

        await project_repository.delete_by_id(id)
    } catch (err) {
        logger.error(`Unexpected error deleting project of id ${id}: ${err}`)
    } finally {
        await mongodb.disconnect()
    }
}


module.exports = { store_project, get_all_projects, delete_project }