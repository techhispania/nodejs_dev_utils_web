const Credential = require("../../domain/model/credential");

async function insert_credential(application_name, username, password) {
    try {
        const credential = new Credential({
            application_name: application_name,
            username: username,
            password: password,
        });

        const saved = await credential.save();
        return saved;
    } catch (err) {
        throw new Error("Insert failed: " + err.message);
    }
}

async function find_all() {
    try {
        return await Credential.find().lean()
    } catch (err) {
        throw new Error(`Find All failed: ${err.message}`)
    }
}

async function find_by_id(id) {
    try {
        return await Credential.findById(id).lean()
    } catch (err) {
        throw new Error(`Find by id failed: ${err.message}`)
    }
}

module.exports = { insert_credential, find_all, find_by_id };
