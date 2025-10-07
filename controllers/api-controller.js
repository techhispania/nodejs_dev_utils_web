const router = require("express").Router()
const subnet_service = require("../services/subnet-service")
const credentials_service = require("../services/credentials-service")
const issues_service = require("../services/issues-service")
const logger = require("../application/logger")

router.post("/api/ip-subnet-calculator", (req, res) => {
    const cicdr = req.body.cicdr

    logger.info(`CICDR received: ${cicdr}`)

    const result = subnet_service.calculate_subnet_from_cicdr(cicdr)
    logger.info(`result: ${JSON.stringify(result)}`)
    res.json(result)
})


router.post("/api/credentials", (req, res) => {
    logger.info(`Credentials to be stored: ${JSON.stringify(req.body)}`)

    credentials_service.store_credential(req.body.application_name, req.body.username, req.body.password)

    res.json({result: "OK"})
})

router.get("/api/credentials/:id", async (req, res) => {
    const id = req.params.id
    logger.info(`Getting credentials for id ${id}`)

    const credential = await credentials_service.get_credential(id)
    logger.debug(`Credential retrieved: ${credential}`)

    res.json({
        application: credential.application_name,
        username: credential.username,
        password: credential.password
    })
})

router.delete("/api/credentials/:id", async (req, res) => {
    const id = req.params.id
    logger.info(`Deleting credential for id ${id}`)

    credentials_service.delete_credential(id)

    res.json({result: "OK"})
})

router.put("/api/credentials/:id", async (req, res) => {
    const id = req.params.id
    logger.info(`Editing credential for id ${id}`)
    
    const application = req.body.application_name
    const username = req.body.username
    const password = req.body.password
    
    credentials_service.edit_credential(id, application, username, password)

    res.json({result: "OK"})
})

router.post("/api/issues-tracker", async (req, res) => {
    const title = req.body.title_input
    const description = req.body.description_input
    const requested_by = req.body.requested_by_input
    const project = req.body.project_input

    await issues_service.store_issue(title, description, requested_by, project)

    res.redirect('/issues-tracker')
})

router.post("/api/issues-tracker/edit", async (req, res) => {
    const id = req.body.issue_id
    const title = req.body.title_input
    const description = req.body.description_input
    const requested_by = req.body.requested_by_input
    const status = req.body.status_input
    const project = req.body.project_input

    const obj = {
        title: title, 
        description: description, 
        requested_by: requested_by, 
        status: status, 
        project: project
    }

    await issues_service.edit_issue(id, obj)

    res.redirect('/issues-tracker')
})

router.put("/api/issues-tracker/:id/status", async (req, res) => {
    const id = req.params.id
    logger.info(`Editing status for id ${id}`)
    
    const status = req.body.status
    
    issues_service.edit_issue_status(id, status)

    res.json({result: "OK"})
})

router.delete("/api/issues-tracker/:id", async (req, res) => {
    const id = req.params.id
    logger.info(`Deleting issue for id ${id}`)

    issues_service.delete_issue(id)

    res.json({result: "OK"})
})

module.exports = router