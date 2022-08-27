let express = require('express');
let router = express.Router();
let iosInfo = require('../models/iosDB')

router.get('/', function(req,res,next){
    return res.json({
        error: false, 
        message: 'Welcome to RESTfull api with node js.'
    });
})

router.get('/posts', (req, res)=>{

    iosInfo.find({}).toArray(function(err, result){
        if (err) {
            res.json({msg:'error'})
        }else{
            res.json(result)
        }
    })
})

router.post('/createPost',(req,res)=>{
    let title = req.body.title;
    let post = req.body.post;

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
                title: req.body.title,                    
                post: req.body.post
            }
            iosInfo.create(values, (err,data)=>{
                if(err) throw err
                return res.send({
                    error: false,
                    message:'Post successfully added',
                    data:[]
                })
            })
        }
})