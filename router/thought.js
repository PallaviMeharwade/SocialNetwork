const express= require('express');
const router = express.Router();
const db = require('../config/db');
const ThoughtModel = db.socialNWDB.thought;
const multer  = require('multer')
const storage = multer.memoryStorage()
//file will be stored in the buffer
const upload = multer({ storage: storage })

//method : POST
//desc: this api used to add the thoughts to db
//apiname: http://localhost:3000/api/thought/addthought

router.post('/addthought',(req,res)=>{

   // let req_loc_name = req.body.loc_name;
    let req_thought_desc= req.body.thought_desc;
    //let req_loc_img = req.file.buffer;
    let req_email = req.body.email;
    //console.log(req.file);

    ThoughtModel.create({
       // loc_name: req_loc_name,
        thought_desc: req_thought_desc,
        //loc_img: req_loc_img,
        email: req_email
    })
    .then((data)=>{
        res.send({
            data:{message: "your thought is posted"},
            status : 200
        })
    })
    .catch((err)=>{   
        res.send({
            data:{message: "your thought  is not posted"},
            status : 500,
            err:err
        })
    })
})


//method: GET
//desc: provide all the posts 
//apiurl:  http://localhost:3000/api/thought/

router.get('/',(req,res)=>{

    let allThoughtData =[];
    ThoughtModel.findAll()
    .then(async(thoughtsdata)=>{
       /*  postsdata.forEach(element => {      
            if(element.loc_img){
            element.loc_img = element.loc_img.toString();
            }
        }); */

        for (const element of thoughtsdata) {
            let thoughtObj={};

           // thoughtObj.loc_name = element['loc_name'];
            thoughtObj.thought_desc = element['thought_desc'];
            //let likeObj= await  getLikesAndDisLikes(element.post_id);
            //if(element.loc_img){
                //element.loc_img = 'data:image/jpg;base64,'+element.loc_img.toString('base64');
                //console.log(element.loc_img)
            //}

            //thoughtObj.loc_img = element['loc_img'];
            thoughtObj.email = element['email'];
            //postObj.likeCount = likeObj.likeCount;
            //postObj.dislikeCount = likeObj.dislikeCount;
            thoughtObj.thought_id = element.thought_id;
            allThoughtData.push(thoughtObj);
        }

        res.send({
            status: 200,
            data:allThoughtData
        });
    })
    .catch((err)=>{
        console.log(err);
        res.send({
            status: 500,
            data:{message: 'Some Error while sending the thought data'},
            err:err
        })
    })
})


/*let getLikesAndDisLikes = async(postId)=>{
       
    let likeCount = await VoteModel.count({
        where: {
            votes: 1,
            post_id: postId
    }})

    let dislikeCount = await VoteModel.count({
        where: {
            votes: 0,
            post_id: postId            
    }})

    return {
        likeCount:likeCount,
        dislikeCount:dislikeCount
    };
}*/
module.exports = router;