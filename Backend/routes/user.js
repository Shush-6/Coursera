const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const userRouter = Router()
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { JWT_USER_PASSWORD } = require("../config");
const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
})
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
userRouter.post("/signup", async function(req, res){
    const { email, password, firstName, lastName } = req.body;
    // hash the password
    //put inside try catch block
    const parsedData = userSchema.safeParse({ email, password, firstName, lastName });
if(!parsedData.success){
    return res.status(400).json({
        message: "Invalid data"
    })
}
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
    const parsedData = signinSchema.safeParse({ email, password });
if(!parsedData.success){
    return res.status(400).json({
        message: "Invalid data"
    })
}
    const user = await userModel.findOne({
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
    res.status(403).json({
        message: "incorrect credentials"
    })
}
})
userRouter.get("/purchases", userMiddleware, async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });

    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    });

    res.json({
        purchases,
        courses: courseData
    })
})
module.exports = userRouter
