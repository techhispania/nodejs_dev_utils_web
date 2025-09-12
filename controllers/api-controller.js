const router = require("express").Router()
const subnet_service = require("../services/subnet-service")
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

    // TODO call service to store the credentials

    res.json({result: "OK"})
})

module.exports = router