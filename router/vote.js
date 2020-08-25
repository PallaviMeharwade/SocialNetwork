const express = require('express');

const db = require('../config/db');
const VoteModel = db.socialNWDB.vote;

const router = express.Router();

//Method: POST
//Desc: This is api will add the sign up details to database
//APIurl: http://localhost:3000/api/vote/add
router.post('/add',(req,res)=>{
    const req_post_id = req.body.post_id;
    const req_email = req.body.email;
    let req_vote = req.body.vote;

    if(req_vote === true){
        req_vote = true;
    }
    else{
        req_vote = false;
    }

    VoteModel.findAll({where: {post_id: req_post_id, email: req_email},raw:true })
    .then((voteUsers)=>{
        //chech if user already voted
        if(voteUsers.length > 0){
            //if same email and postid already present
            VoteModel.update({votes: req_vote},{
                where:{
                    post_id: req_post_id, email: req_email
                }
            })
            .then((data)=>{
                res.send({
                    data:{message: "your vote is updated"},
                    status:200
                })
            })
            .catch((err)=>{
                throw err;
            })
        }
        else{
            //if same email and post_id does nto exist
            VoteModel.create({
                post_id: req_post_id,
                votes: req_vote,
                email: req_email
            })
            .then((data)=>{
                res.send({
                    data:{message: "your vote is added"},
                    status: 200
                })
            })
            .catch((err)=>{
                throw err;
            })
        }
    })
    .catch((err)=>{
        res.send({
            data:{message: "your vote is not added or updated"},
            status: 500,
            err:err
        })
    })
})

//Method: GET
//Desc: This is api will give all details with count of likes and dislikes of the post
//APIurl: http://localhost:3000/api/vote/add
router.get('/',(req,res) => {
    VoteModel.findAll({attributes:[db.sequelize.literal('DISTINCT `post_id`'), 'post_id'],raw:true})
    .then(async(votes)=>{
        for (const element of votes){
            let likeCount = await VoteModel.count({
                where: {
                    votes: 1,
                    post_id: element['post_id']
                }
            })
            let dislikeCount = await VoteModel.count({
                where: {
                    votes: 0,
                    post_id: element['post_id']
                }
            })
            element['likeCount'] = likeCount;
            element['dislikeCount'] = dislikeCount;
        }
        res.send({
            status: 200,
            data:votes
        });
    })
    .catch((err)=>{
        res.send({
            data:{message:"error to load post"},
            status: 500,
            err:err
        })
    })
})

module.exports = router;