const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const rest = require("./REST")

/**
 * @const connection has all the information to do the connection to our database
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gitei'
})

/**
 * does the connection
 */
connection.connect((err) => {
    if (err)
        console.error(err)
    else
        console.log("Database connected")
})

/**
 * sets port of our server
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
