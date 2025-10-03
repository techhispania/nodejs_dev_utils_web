const Issue = require("../../domain/model/issue")

async function insert(title, description, requested_by, project, status) {
    try {
        const issue = new Issue({
            title: title,
            description: description,
            requested_by: requested_by,
            project: project,
            status: status
        });

        const saved = await issue.save()
        return saved;
    } catch (err) {
        throw new Error("Insert failed: " + err.message)
    }
}

async function find_all() {
    try {
        return await Issue.find().sort({ createdAt: 1 }).lean()
    } catch (err) {
        throw new Error(`Find All failed: ${err.message}`)
    }
}

module.exports = { insert, find_all };
