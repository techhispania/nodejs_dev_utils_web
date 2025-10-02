const express = require("express")
const { engine } = require("express-handlebars")

const web_controller = require("./controllers/web-controller")
const api_controller = require("./controllers/api-controller")

const { TITLE, PORT } = require("./application/constants")

const logger = require("./application/logger")

const dotenv = require("dotenv");

dotenv.config(); // load .env into process.env

const app = express()

// configure templates engine "handlebars"
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(api_controller)
app.use(web_controller)

app.listen(PORT, () => {
    logger.info(`${TITLE} listening on port ${PORT}`)
})