const express = require('express');
const db = require('../config/db');
const UserModel = db.socialNWDB.user;
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

/*router.get('/',(req,res) => {
    res.send("auth route connection established")
})*/

//@Method: POST
//Desc: This is api will add the sign up details to database
//API Name: http://localhost:3000/api/auth/signup

router.post('/signup',(req,res)=>{
    //collect data from request
    let reqname = req.body.name;
    let reqemail = req.body.email;
    let plainpassword = req.body.password;
    let reqinsta_name = req.body.insta_id;
    let reqcountry = req.body.country;
    let reqbio = req.body.bio;
    let req_user_img;
    let reqpassword = bcrypt.hashSync(plainpassword, saltRounds);
    if(req.body.user_img){
        req_user_img = req.body.user_img
    }

    //store req data in user table
    UserModel.create({
        name: reqname,
        email: reqemail,
        password: reqpassword,
        insta_id: reqinsta_name,
        country: reqcountry,
        bio: reqbio,
        user_img: req_user_img
    })
    //feedback methods
    .then(()=>{
        res.send({
            message: "User added successfully",
            status: 200
        })
    })
    .catch((err)=>{
        res.send({
            message: "Unable to add user to the server",
            status: 500,
            err:err
        })
    })
})

//@Method: POST
//Desc: This is api will check credentials and respond to ui
//API Name: http://localhost:3000/api/auth/signin

router.post('/signin',(req,res)=>{
    const req_email = req.body.email;
    const req_password = req.body.password;

    UserModel.findByPk(req_email)
    //feedback
    .then((usersdata)=>{
        console.log(usersdata.password)
        if (bcrypt.compareSync(req_password, usersdata.password)==true){
            res.send({
                message: "user signin successful",
                status: 200,
                email: req_email
            })
        }
        else{
            res.send({
                message: "Invalid email-id or password!",
                status: 404
            })
        }
    })
    .catch((err)=>{
        res.send({
            message: "Invalid email-id",
            status: 500,
            err:err
        })
    })
})

module.exports = router;