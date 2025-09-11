const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    level: "debug", // default log level
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
            (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
        )
    ),
    transports: [
        new transports.Console(), // log to console
        // new transports.File({ filename: 'app.log' }) // optionally log to a file
    ],
});

module.exports = logger;
