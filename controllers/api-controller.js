const router = require("express").Router()
const subnet_service = require("../services/subnet-service")
const credentials_service = require("../services/credentials-service")
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

module.exports = router