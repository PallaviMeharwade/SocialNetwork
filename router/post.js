const express= require('express');
const router = express.Router();
const db = require('../config/db');
const PostModel = db.socialNWDB.post;
const VoteModel = db.socialNWDB.vote;
const multer  = require('multer')
const storage = multer.memoryStorage()
//file will be stored in the buffer
const upload = multer({ storage: storage })

//method : POST
//desc: this api used to add the posts to db
//apiname: http://localhost:3000/api/post/addpost

router.post('/addpost',upload.single('loc_img'),(req,res)=>{

    let req_loc_name = req.body.loc_name;
    let req_loc_desc= req.body.loc_desc;
    let req_loc_img = req.file.buffer;
    let req_email = req.body.email;
    console.log(req.file);

    PostModel.create({
        loc_name: req_loc_name,
        loc_desc: req_loc_desc,
        loc_img: req_loc_img,
        email: req_email
    })
    .then((data)=>{
        res.send({
            data:{message: "your post is added"},
            status : 200
        })
    })
    .catch((err)=>{   
        res.send({
            data:{message: "your post  is not added"},
            status : 500,
            err:err
        })
    })
})


//method: GET
//desc: provide all the posts 
//apiurl:  http://localhost:3000/api/post/

router.get('/',(req,res)=>{

    let allPostData =[];
    PostModel.findAll()
    .then(async(postsdata)=>{
       /*  postsdata.forEach(element => {      
            if(element.loc_img){
            element.loc_img = element.loc_img.toString();
            }
        }); */

        for (const element of postsdata) {
            let postObj={};

            postObj.loc_name = element['loc_name'];
            postObj.loc_desc = element['loc_desc'];
            let likeObj= await  getLikesAndDisLikes(element.post_id);
            if(element.loc_img){
                element.loc_img = 'data:image/jpg;base64,'+element.loc_img.toString('base64');
                //console.log(element.loc_img)
            }

            postObj.loc_img = element['loc_img'];
            postObj.email = element['email'];
            postObj.likeCount = likeObj.likeCount;
            postObj.dislikeCount = likeObj.dislikeCount;
            postObj.post_id = element.post_id;
            allPostData.push(postObj);
        }

        res.send({
            status: 200,
            data:allPostData
        });
    })
    .catch((err)=>{
        console.log(err);
        res.send({
            status: 500,
            data:{message: 'Some Error while sending the post data'},
            err:err
        })
    })
})


let getLikesAndDisLikes = async(postId)=>{
       
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
}

module.exports = router;