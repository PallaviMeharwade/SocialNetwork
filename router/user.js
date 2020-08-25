const express = require('express');
const UserModel = require('../config/db').socialNWDB.user;
const router = express.Router();

//@Method: GET
//Desc: Provide all usrs bio
//API url: http://localhost:3000/api/user/
router.get('/',(req,res) => {
    UserModel.findAll({attributes:['name','bio','email','user_img']})
    .then((usersdata)=>{
        usersdata.forEach(element => {
            if(element.user_img){
                element.user_img = element.user_img.toString();
        }});
        res.send({
            status: 200,
            data:usersdata
        })
    })
    .catch((err)=>{
        res.send({
            status:500,
            data:{message: 'Some Error while sending the user data'},
            err:err
        })
    })
})

router.get('/:email',(req,res)=>{
    console.log(req.params.email)
    let emailid =  req.params.email
    UserModel.findOne({where:{email:emailid},attributes:['name','email','insta_id','country','bio','user_img']})
    .then((userdata)=>{
        if(userdata){
            if(userdata.user_img){
                userdata.user_img=userdata.user_img.toString()
            }
            res.send({
                status: 200,
                data: userdata
            })
        }
        else{
            res.send({
                status: 404,
                data:{message: 'user not found 404'}
            })
        }
    })
    .catch((err)=>{
        res.send({
            status:500,
            data:{message: 'Some Error while sending the user data'},
            err:err
        })
    })
})

module.exports = router;