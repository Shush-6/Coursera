const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router()
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");
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
userRouter.post("/signin", async function(req, res){
    const { email, password } = req.body;
    //to do for u: hashed password needed 
    const user = await userModel.find({
        email:email,
        password:password
    });
    if(user){
        const token = jwt.sign({
            id: user.id
        },JWT_USER_PASSWORD)
    
    res.json({
        token: token
    })
}
else {
    req.statusCode(403).json({
        message: "incorrect credentials"
    })
}
})
userRouter.get("/purchases",function(req, res){
    res.json({
        message: "signup endpoint"
    })
})
module.exports = userRouter
