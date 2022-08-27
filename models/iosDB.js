const mongoose = require('mongoose')
const Schema = mongoose.Schema

let iosSchema = Schema ({
    id: String,                    
    title: String,                      
    post: String
})

module.exports = mongoose.model('iosDB', iosSchema)