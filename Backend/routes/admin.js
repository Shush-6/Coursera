const { Router } = require("express");
const adminRoutes = Router();
const { adminModel, userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aladid12"
//bcrypt,
adminRoutes.post("/signup",async function(req,res){
    const {email, password, firstName, lastName } = req.body;
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "successfully reached"
    })
})
adminRoutes.post("/signin", async function(req,res){
    const { email, password } = req.body;
    const admin = await adminModel.find({
        email: email,
        password: password
    });
    if(admin){
        const token = jwt.sign({
            id : admin.id
        }, JWT_USER_PASSWORD)
        res.json({
            token : token
        })
    }
    else{
        req.statusCode(403).json({
        message: "incorrect credentials"
    })
    }
})
adminRoutes.post("/course", (req,res)=>{
    res.json({
        message: "successfully reached"
    })
})
adminRoutes.put("/course/purchase", (req,res)=>{
    res.json({
        message: "successfully reached"
    })
})
adminRoutes.get("/course/bulk", (req,res)=>{
    res.json({
        message: "successfully reached"
    })
})
module.exports = adminRoutes;