const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/iosDB';
mongoose.connect(url);
const iosInfo = require('./iosDB');

const info = new iosInfo({
    id: '101',                    
    title: "Swift content",                      
    post: 'This post is all about SwiftUI from PPG'
})

info.save().then((doc) => {
    console.log(doc)
})