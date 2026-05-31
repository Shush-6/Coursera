const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const userRouter = Router()
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { JWT_USER_PASSWORD } = require("../config");
const bcrypt = require("bcrypt");

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
    try {
        const { email, password, firstName, lastName } = req.body;
        const parsedData = userSchema.safeParse({ email, password, firstName, lastName });
        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid data"
            });
        }
        const hashedpassword = await bcrypt.hash(password,5);
        await userModel.create({
            email: email,
            password: hashedpassword,
            firstName: firstName,
            lastName: lastName
        });
        res.json({
            message: "signup succedded"
        });
    } catch(e) {
        return res.status(500).json({
            message: "internal server error",
            error: e.message
        });
    }
});

userRouter.post("/signin", async function(req, res){
    try {
        const { email, password } = req.body;
        const parsedData = signinSchema.safeParse({ email, password });
        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid data"
            });
        }
        const user = await userModel.findOne({
            email:email,
        });
        if(user){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                const token = jwt.sign({
                    id: user.id
                },JWT_USER_PASSWORD)
        
            res.json({
                token: token
            });
            } else {
                res.status(403).json({
                    message: "incorrect credentials"
                });
            }
        } else {
            res.status(403).json({
                message: "incorrect credentials"
            });
        }
    } catch(e) {
        return res.status(500).json({
            message: "internal server error",
            error: e.message
        });
    }
});

userRouter.get("/purchases", userMiddleware, async function(req, res){
    try {
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
        });
    } catch(e) {
        res.status(500).json({
            message: "internal server error",
            error: e.message
        });
    }
});
module.exports = userRouter
