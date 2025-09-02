const express = require("express")
const { engine } = require("express-handlebars")
const app = express()
const PORT = 3000
const TITLE = "Dev-Utils Web"

// configure templates engine "handlebars"
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.get('/', (req, res) => {
    res.render("index", {
        title: TITLE,
        body_title: "JSON Beautifier"
    })
})

app.listen(PORT, () => {
    console.log(`${TITLE} listening on port ${PORT}`)
})