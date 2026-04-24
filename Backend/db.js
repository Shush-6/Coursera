const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Coursera:a1pP56LtBzlDSAVm@cluster0.zmfhw1z.mongodb.net/coursera-app")
console.log("connected to");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})
const adminSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    firstName: String,
    lastName: String,
})
const purchaseSchema = new Schema({
    userId: ObjectId,
    couseId: ObjectId
})
const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
