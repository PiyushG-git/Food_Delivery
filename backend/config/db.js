import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://piyushg251004:FoodDelivery@cluster0.rsesupy.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}