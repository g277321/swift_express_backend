let express = require('express');
let app = express();
let bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const fs = require('fs');


let iosDB = require('./models/iosDB');

const port = process.env.PORT || 3000;

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit:'50mb'}));

//connect mongodb database
var setting = setting = {
    database: 'iosDB'
  }
var url = 'mongodb://localhost:27017/' + setting.database;
mongoose.connect(url);

app.get('/', (req, res) => {
    return res.json({
        error: false, 
        message: 'Welcome to RESTfull api with node js.'
    });
})

app.get('/posts', (req, res) => {
    let all =     iosDB.find()
    console.log(all)

    iosDB.find().toArray(function(err, result){
        if (err) {
            res.json({msg:'error'})
        }else{
            res.json(result)
        }
    })
})

app.post('/createPost', (req, res) => {
    let title = req.body.title;
    let post = req.body.post;

    // console.log('HHHHHHHHHHHHHHHHHH')
    // console.log(req.body)
    // console.log('HHHHHHHHHHHHHHHHHH')

        //check validation
        if (!title || !post) {
            return res
            .status(400)
            .send({
                error: true,
                message: "Please provide title ane post"
            });
        } else {
            

            let values = {
                id: 5,
                title: title,                    
                post: post
            }
            iosDB.create(values, (err,data)=>{
                if(err) throw err
                return res.send({
                    error: false,
                    message:'Post successfully added',
                    data:[]
                })
            })
        }

    // let title = req.body.title;
    // let post = req.body.post;

    // //check validation
    // if (!title || !post) {
    //     return res
    //     .status(400)
    //     .send({
    //         error: true,
    //         message: "Please provide title ane post"
    //     });
    // } else {
    //     let values = [title, post];
    //     conn.query('INSERT INTO posts (title, post) VALUES(?, ?)', values, (error, results, fields) => {
    //         if (error) throw error;
    //         return res.send({
    //             error: false,
    //             message: 'Post successfully added',
    //             data: []
    //         })
    //     });
    // }
})


app.post('/createBilling', (req, res) => {

    let body = req.body

    // console.log('HHHHHHHHHHHHHHHHHH')
    // console.log(req.body)
    // console.log('HHHHHHHHHHHHHHHHHH')

        //check validation
        // if (!title || !post) {
        //     return res
        //     .status(400)
        //     .send({
        //         error: true,
        //         message: "Please provide title ane post"
        //     });
        // } else {
            

            let values = {
                id: 5,
                body: body
            }

            let data = body.image

            console.log(body)
            let base64Data = data.replace(/\s/g, "+");
            let buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync('stack-abuse-logo-out.jpeg', buffer);

console.log('Base64 image data converted to file: stack-abuse-logo-out.jpeg');
        // }
})







// app.put('/updatePost', (req, res) => {
//     let id = req.body.id;
//     let title = req.body.title;
//     let post = req.body.post;

//     //check validation
//     if (!title || !post || !id) {
//         return res
//         .status(400)
//         .send({
//             error: true,
//             message: "Please provide id, title and post"
//         });
//     } else {
//         // let values = [title, post, id];
//         conn.query('UPDATE posts SET title = ?, post = ? WHERE id = ?', values, (error, results, fields) => {
//             if (error) throw error;

//             let message = ""
//             if (results.changedRows === 0) {
//                 message = "Post not found or data are same"
//             } else {
//                 message = "Post successfully updated"
//             }

//             return res.send({
//                 error: false,
//                 message: message,
//                 data: []
//             })
//         });
//     }
// })

app.delete('/deletePost', (req, res) => {
    let id = req.body.id;

    //check validation
    if (!id) {
        return res
        .status(400)
        .send({
            error: true,
            message: "Please provide book id"
        });

    } else {

        let values = {
            id: id,
            title: req.body.title,                    
            post: req.body.post
        }

        iosDB.deleteOne(values, (err, res)=>{
            if(err) throw err
            let message = "";

            if (results.affectedRows === 0) {
                message = "Post not found";
            } else {
                message = "Post successfully deleted";
            }

            return res.send({
                error: false,
                message: message,
                data: []
            })
        })


        // let values = [id];
        // conn.query('DELETE FROM posts WHERE id = ?', values, (error, results, fields) => {
        //     if (error) throw error;

        //     let message = "";

        //     if (results.affectedRows === 0) {
        //         message = "Post not found";
        //     } else {
        //         message = "Post successfully deleted";
        //     }

        //     return res.send({
        //         error: false,
        //         message: message,
        //         data: []
        //     })
        // });
    }
})


app.listen(port, () => {
    console.log("Listening on port %d", port);
})

module.exports = app;