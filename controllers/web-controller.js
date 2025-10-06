const router = require("express").Router()
const credentials_service = require("../services/credentials-service")
const issues_service = require("../services/issues-service")
const constants = require("../application/constants")

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

router.get("/credentials-manager", async (req, res) => {

    const credentials = await credentials_service.get_all_credentials()

    res.render("credentials-manager", {
        title: `${TITLE} - Credentials Manager`,
        credentials: credentials
    })
})

router.get("/issues-tracker", async (req, res) => {

    const issues = await issues_service.get_all_issues()

    res.render("issues-tracker", {
        title: `${TITLE} - Issues Tracker`,
        issues: issues
    })
})

router.get("/issues-tracker/new", (req, res) => {
    res.render("issues-tracker-new", {
        title: `${TITLE} - Issues Tracker`,
        subtitle: `New Issue`,
        projects: constants.ISSUE_PROJECTS
    })
})


router.get("/issues-tracker/:id", async (req, res) => {

    const issue_id = req.params.id

    const issue = await issues_service.get_issue(issue_id)

    res.render("issues-tracker-show", {
        title: `${TITLE} - Issues Tracker`,
        subtitle: `Issue`,
        issue: issue,
        status_list: constants.ISSUE_STATUS_LIST
    })
})

module.exports = router