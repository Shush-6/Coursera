const { Router } = require("express");
const adminRoutes = Router();
const { adminModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const { z } = require("zod");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
})
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    firstName: z.string(),
    lastName: z.string()
})
adminRoutes.post("/signup",async function(req,res){
    const {email, password, firstName, lastName } = req.body;
    const parsedData = signupSchema.safeParse({ email, password, firstName, lastName });
    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
    }
    const user = await adminModel.findOne({
        email: email,
        password: password
    });
    if(user){
        return res.status(403).json({
            message: "user already exists"
        })
    }
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    const token = jwt.sign({
        id : admin._id
    }, JWT_ADMIN_PASSWORD)
    res.json({
        token: token
    })
})
adminRoutes.post("/signin", async function(req,res){
    const { email, password } = req.body;
    const parsedData = signinSchema.safeParse({ email, password });
    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
    }
    const user = await adminModel.findOne({
        email: email,
        password: password
    });
    if(user){
        const token = jwt.sign({
            id : user._id
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
    const parsedData = courseSchema.safeParse({ title, description, price, firstName, lastName });
    if(!parsedData.success){
        return res.status(400).json({
            message: "Invalid data"
        })
    }
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