const express = require('express');

const server = express();

server.use(express.json())

server.get("/init", (req, res) => {
    return res.json({
        response: "Started"
    })
})

server.post("/sync", (req, res) => {
    console.log(req.body)

    return res.json({
        response: req.body
    })
})

server.listen(4444)