const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const rest = require("./REST")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'InMortaLIty3.',
    database: 'gitei'
})

connection.connect((err) => {
    if (err)
        console.error(err)
    else
        console.log("Database connected")
})

/**
 * set port
 */
const port = 8080

/**
 * Set the configuration of the server
 */
const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(rest(connection))


/**
 * Start the server in port
 */
app.listen(port, () => {
    console.log("working")
})