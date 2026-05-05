const { Router } = require("express");
const adminRoutes = Router();
const { adminModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
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
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });
    if(admin){
        const token = jwt.sign({
            id : admin._id
        }, JWT_ADMIN_PASSWORD)
        res.json({
            token : token
        })
    }
    else{
        req.status(403).json({
        message: "incorrect credentials"
    })
    }
})
adminRoutes.post("/course",adminMiddleware, async function(req,res){
    const adminId = req.adminId;
    const { title, description, price, firstName, lastName } = req.body;
    const course = await courseModel.create({
        title : title,
        description: description,
        price: price,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "course created",
        courseId: course._id
    })
})
adminRoutes.put("/course/purchase", adminMiddleware, async function(req,res){
     const adminId = req.userId;
    const { title, description, price, firstName, lastName, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title : title,
        description: description,
        price: price,
        firstName: firstName,
        lastName: lastName
    })
    res.json({
        message: "course updated"
    })
})
adminRoutes.get("/course/bulk", (req,res)=>{
    res.json({
        message: "successfully reached"
    })
})
module.exports = adminRoutes;