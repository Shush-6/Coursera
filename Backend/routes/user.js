const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body;// adding zod validation is remaining
    // hash the password
    //put inside try catch block
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "signup succedded"
    })
})
userRouter.post("/signin",function(req, res){
    res.json({
        message: "signup endpoint"
    })
})
userRouter.get("/purchases",function(req, res){
    res.json({
        message: "signup endpoint"
    })
})
module.exports = userRouter
