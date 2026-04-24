const { Router } = require("express");
const courseRoutes = Router();

courseRoutes.post("/purchases",function(req, res){
    res.json({
        message: "signup endpoint"
    })
})
courseRoutes.get("",function(req, res){
    res.json({
        message: "signup endpoint"
    })
})

module.exports = courseRoutes
