const router = require("express").Router()

const { TITLE } = require("../application/constants")

router.get("/", (req, res) => {
    res.render("index", {
        title: TITLE
    })
})

router.get("/json-beautifier", (req, res) => {
    res.render("json-beautifier", {
        title: `${TITLE} - JSON Beautifier`
    })
})

router.get("/ip-subnet-calculator", (req, res) => {
    res.render("ip-subnet-calculator", {
        title: `${TITLE} - IP Subnet Calculator`
    })
})

router.get("/credentials-manager", (req, res) => {
    res.render("credentials-manager", {
        title: `${TITLE} - Credentials Manager`
    })
})

module.exports = router