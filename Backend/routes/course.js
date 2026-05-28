const { Router } = require("express");
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const courseRoutes = Router();

courseRoutes.post("/purchases", userMiddleware, async function(req, res){
    const userId = req.userId;
    const { courseId } = req.body;
    
    // Create a new purchase
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    });
    
    res.json({
        message: "Course purchased successfully"
    });
});

courseRoutes.get("", async function(req, res){
    // Fetch all available courses
    const courses = await courseModel.find({});
    res.json({
        courses: courses
    });
});

module.exports = courseRoutes;
