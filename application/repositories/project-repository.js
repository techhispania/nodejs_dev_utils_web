const Project = require("../../domain/model/project")

async function insert(name) {
    try {
        const project = new Project({
            name: name
        });

        const saved = await project.save()
        return saved;
    } catch (err) {
        throw new Error("Insert failed: " + err.message)
    }
}

async function find_all() {
    try {
        return await Project.find().sort({ name: 1 }).lean()
    } catch (err) {
        throw new Error(`Find All failed: ${err.message}`)
    }
}

async function delete_by_id(id) {
    try {
        await Project.findByIdAndDelete(id)
    } catch (err) {
        throw new Error(`Delete by id failed: ${err.message}`)
    }
}

module.exports = { insert, find_all, delete_by_id };
