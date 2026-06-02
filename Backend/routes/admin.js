const { Router } = require("express");
const adminRoutes = Router();
const { adminModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");
const { z } = require("zod");
const bcrypt = require("bcrypt");
                            
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    role: z.literal("Admin").default("Admin")
})
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.literal("Admin").default("Admin")
})
const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    firstName: z.string(),
    lastName: z.string()
})
adminRoutes.post("/signup", async function(req,res){
    try {
        const {email, password, firstName, lastName, role } = req.body;
        const parsedData = signupSchema.safeParse({ email, password, firstName, lastName, role });
        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid data"
            });
        }
        const user = await adminModel.findOne({
            email: email
        });
        if(user){
            return res.status(403).json({
                message: "user already exists"
            });
        }
        const hashedpassword = await bcrypt.hash(password, 5);
        const admin = await adminModel.create({
            email: email,
            password: hashedpassword,
            firstName: firstName,
            lastName: lastName,
            role: "Admin"
        });
        const token = jwt.sign({
            id : admin.id,
            role: role
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "user already exist",
            error: error.message
        });
    }
});

adminRoutes.post("/signin", async function(req,res){
    try {
        const { email, password, role } = req.body;
        const parsedData = signinSchema.safeParse({ email, password, role });
        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid data"
            });
        }
        const user = await adminModel.findOne({
            email: email
        });
        if(user){
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                const token = jwt.sign({
                    id : user.id,
                    role: role
                }, JWT_ADMIN_PASSWORD);
                return res.json({
                    token : token
                });
            }
        }
        res.status(403).json({
            message: "incorrect credentials"
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
});

adminRoutes.post("/course", adminMiddleware, async function(req,res){
    try {
        const adminId = req.adminId;
        const { title, description, price, firstName, lastName } = req.body;
        const parsedData = courseSchema.safeParse({ title, description, price, firstName, lastName });
        if(!parsedData.success){
            return res.status(400).json({
                message: "Invalid data"
            });
        }
        const course = await courseModel.create({
            title : title,
            description: description,
            price: price,
            firstName: firstName,
            lastName: lastName,
            creatorId: adminId
        });
        res.json({
            message: "course created",
            courseId: course._id
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
});

adminRoutes.put("/course/purchase", adminMiddleware, async function(req,res){
    try {
        const adminId = req.adminId;
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
        });
        res.json({
            message: "course updated"
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
});

adminRoutes.get("/course/bulk", adminMiddleware, async (req,res)=>{
    try {
        const adminId = req.adminId;
        const courses = await courseModel.find({
            creatorId: adminId
        });
        res.json({
            courses: courses
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        });
    }
});
module.exports = adminRoutes;