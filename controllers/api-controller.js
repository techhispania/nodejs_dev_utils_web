const router = require("express").Router()
const subnet_service = require("../services/subnet-service")

router.post("/api/ip-subnet-calculator", (req, res) => {
    const cicdr = req.body.cicdr

    console.log(`CICDR received: ${cicdr}`)

    const result = subnet_service.calculate_subnet_from_cicdr(cicdr)
    console.log(`result: ${JSON.stringify(result)}`)
    res.json(result)
})

module.exports = router