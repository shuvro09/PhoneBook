const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3001
let contactData = [
    {
        name: "raju",
        number: 12345,
        id: 100
    },
    {
        name: "tanu",
        number: 8013018300,
        id: 101
    }
]
app.use(cors())
app.use(bodyParser.json())
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    next()
})
app.get("/", (req, res) => {
    console.log("GET request received");
    res.json(contactData)
    // res.status(404).send("error")
})

app.post("/", (req, res) => { console.log(req.body[0].name + " received"); res.send("received") })
app.listen(PORT, () => console.log("running"))