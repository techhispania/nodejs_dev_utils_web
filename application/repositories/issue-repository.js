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
        return await Issue.find().sort({ createdAt: -1 }).lean()
    } catch (err) {
        throw new Error(`Find All failed: ${err.message}`)
    }
}

async function find_by_id(id) {
    try {
        return await Issue.findById(id).lean()
    } catch (err) {
        throw new Error(`Find by id failed: ${err.message}`)
    }
}

async function update(id, obj) {
    try {
        const updated = await Issue.findByIdAndUpdate(id, 
                                                    { $set: obj }, 
                                                    { new: true })
        return updated;
    } catch (err) {
        throw new Error("Update failed: " + err.message)
    }
}

async function delete_by_id(id) {
    try {
        await Issue.findByIdAndDelete(id)
    } catch (err) {
        throw new Error(`Delete by id failed: ${err.message}`)
    }
}

module.exports = { insert, find_all, find_by_id, update, delete_by_id };
