const express = require("express");
const cors = require("cors");
const  userRouter  = require("./routes/user");
const  courseRoutes  = require("./routes/course");
const adminRoutes = require("./routes/admin");
const app = express ();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend/dist"));
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
})
app.use("/user", userRouter);   
app.use("/course",courseRoutes);
app.use("/admin",adminRoutes);
app.listen(3000, ()=>{
    console.log("App running on port 3000");
});