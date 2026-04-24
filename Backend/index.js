const express = require("express");
const  userRouter  = require("./routes/user");
const  courseRoutes  = require("./routes/course");
const adminRoutes = require("./routes/admin");
const app = express ();

app.use("/user", userRouter);
app.use("/course",courseRoutes);
app.use("/admin",adminRoutes);
app.listen(3000, ()=>{
    console.log("App running on port 3000");
});