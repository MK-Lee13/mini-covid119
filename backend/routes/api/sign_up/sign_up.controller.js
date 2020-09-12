
const express = require('express');
const router = express.Router();
const models = require("../../../models");
const crypto = require("crypto");

exports.get = (req, res) => {
    res.render('../views/sign_up');
}

exports.post = (req, res) => {
    
    //console.log(req.body);
    let body = req.body;
    let inputPassword = body.password;
    let salt = Math.round((new Date().valueOf() * Math.random())) + "";
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    let result = models.user.create({
        name: body.userName,
        email: body.userEmail,
        password: hashPassword,
        salt: salt
    })

    //res.redirect("http://localhost:3000/api/sign_up");
    res.send("hello");
    console.log(result)
}

// apple / apple@apple.com / apple 
