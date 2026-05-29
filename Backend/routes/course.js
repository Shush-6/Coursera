const { Router } = require("express");
const { courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const courseRoutes = Router();

courseRoutes.post("/purchases", userMiddleware, async function(req, res){
    const userId = req.userId;
    const { courseId } = req.body;
    
    try {
        // Create a new purchase
        await purchaseModel.create({
            userId: userId,
            courseId: courseId
        });
        
        res.json({
            message: "Course purchased successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to purchase course",
            error: error.message
        });
    }
});

courseRoutes.get("", async function(req, res){
    // Fetch all available courses
    const courses = await courseModel.find({});
    res.json({
        courses: courses
    });
});

module.exports = courseRoutes;
