const express= require('express');
const router = express.Router();
const db = require('../config/db');
const FeedbackModel = db.socialNWDB.feedback;
const multer  = require('multer')
const storage = multer.memoryStorage()
//file will be stored in the buffer
const upload = multer({ storage: storage })

//method : POST
//desc: this api used to add the thoughts to db
//apiname: http://localhost:3000/api/feedback/addfeedback

router.post('/addfeedback',(req,res)=>{

   
    let req_feed_desc= req.body.feed_desc;
    let req_feed_rate= req.body.feed_rate;
    
    let req_email = req.body.email;
    //console.log(req.file);

    FeedbackModel.create({
       
        feed_desc: req_feed_desc,
        feed_rate: req_feed_rate,
        email: req_email
    })
    .then((data)=>{
        res.send({
            data:{message: "your feedback is considered"},
            status : 200
        })
    })
    .catch((err)=>{   
        res.send({
            data:{message: "your feedback  is not considered"},
            status : 500,
            err:err
        })
    })
})


//method: GET
//desc: provide all the posts 
//apiurl:  http://localhost:3000/api/feedback/

router.get('/',(req,res)=>{

    let allFeedbackData =[];
    FeedbackModel.findAll()
    .then(async(feedbacksdata)=>{
       /*  postsdata.forEach(element => {      
            if(element.loc_img){
            element.loc_img = element.loc_img.toString();
            }
        }); */

        for (const element of feedbacksdata) {
            let feedbackObj={};

        
           feedbackObj.feed_desc = element['feed_desc'];
           feedbackObj.feed_rate = element['feed_rate'];
            
            feedbackObj.email = element['email'];
            
            feedbackObj.thought_id = element.feedback_id;
            allFeedbackData.push(feedbackObj);
        }

        res.send({
            status: 200,
            data:allFeedbackData
        });
    })
    .catch((err)=>{
        console.log(err);
        res.send({
            status: 500,
            data:{message: 'Some Error while sending the feedback data'},
            err:err
        })
    })
})



module.exports = router;