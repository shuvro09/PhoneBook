const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3001
const mongoose = require("mongoose")
const Contact = require("./models/contacts")
//Set up default mongoose connection

const mongoDB = 'mongodb://127.0.0.1/contacts';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(bodyParser.json())
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    next()
})
app.get("/", (req, res) => {
    console.log("GET request received");
    Contact.find()
        .then((doc) => {
            res.send(doc)
        })
        .catch((err) => { console.log(err) })
    // res.status(404).send("error")
})

app.post("/", (req, res) => {
    const contact = new Contact({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        number: req.body.number
    })
    contact.save()
        .then(result => {
            console.log(result)
            res.send(result)
        })
        .catch(err => { console.log(err) })
    console.log()
    //res.send(contact)
})
app.listen(PORT, () => console.log("running"))