const express = require("express")
const { engine } = require("express-handlebars")
const subnet_service = require("./services/subnet-service")
const app = express()
const PORT = 3000
const TITLE = "Dev-Utils Web"

// configure templates engine "handlebars"
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index", {
        title: TITLE
    })
})

app.get("/json-beautifier", (req, res) => {
    res.render("json-beautifier", {
        title: `${TITLE} - JSON Beautifier`
    })
})

app.get("/ip-subnet-calculator", (req, res) => {
    res.render("ip-subnet-calculator", {
        title: `${TITLE} - IP Subnet Calculator`
    })
})

app.post("/api/ip-subnet-calculator", (req, res) => {
    const cicdr = req.body.cicdr

    console.log(`CICDR received: ${cicdr}`)

    const result = subnet_service.calculate_subnet_from_cicdr(cicdr)
    console.log(`result: ${JSON.stringify(result)}`)
    res.json(result)
})

app.listen(PORT, () => {
    console.log(`${TITLE} listening on port ${PORT}`)
})