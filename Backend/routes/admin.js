const { Router } = require("express");
const adminRoutes = Router();
const { adminModel } = require("../db");
adminRoutes.post("/signup", (req,res)=>{
    res.json({
        message: "successfully reached"
    })
})
adminRoutes.post("/signin", (req,res)=>{
    res.json({
        message: "successfully reached"
    })
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