const { ElementSchemaRegistry } = require('@angular/compiler')
const express = require('express')

function createRouter(db) {
    const router = express.Router()


    router.post("/", (req, res) => {
        
        db.query(
            'insert into personas (cedula,nombre,apellido) values (?,?,?)',
            [req.body.cedula, req.body.nombre, req.body.apellido],
            (err) => {
                if (err)
                    res.status(500).json({ status: 'Couldnt be done' })
                else
                    res.status(200).json({ status: 'Done!' })
            }

        )
    })

    router.get("/all", (req, res) => {
        db.query(
            'select * from personas',
            (err, rows, fields) => {
                if (err)
                    console.err(err)
                else
                    res.json(rows)
            }
        )
    })

    return router
}

module.exports = createRouter