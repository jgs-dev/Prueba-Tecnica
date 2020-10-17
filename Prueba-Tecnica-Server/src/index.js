const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'InMortaLIty3.',
    database: 'gitei'
})

connection.connect()

const port = process.env.PORT || 8080

const app = express()
    .use(cors())
    .use(bodyParser.json())

app.listen(port, () => {
    console.log("working")
})