const mongoose = require('mongoose');

//creating schema 
const contactsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    number: String
})
module.exports = mongoose.model("Contacts", contactsSchema)