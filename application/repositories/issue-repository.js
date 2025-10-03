const Issue = require("../../domain/model/issue")

async function insert_issue(title, description) {
    try {
        const issue = new Issue({
            title: title,
            description: description
        });

        const saved = await issue.save()
        return saved;
    } catch (err) {
        throw new Error("Insert failed: " + err.message)
    }
}

module.exports = { insert_issue };
