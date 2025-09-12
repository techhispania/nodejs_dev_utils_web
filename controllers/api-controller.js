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

module.exports = router