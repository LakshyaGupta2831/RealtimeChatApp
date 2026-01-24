import mongoose from "mongoose";

// here we make schema for user like the characterstics, qualities of user.
// Basic motive is to fill the details of users in the database, 
// just like how we fill the details in whatsapp while signing up.
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,  //cannot be unique//
    },
    image:{
        type:String,
        default:"",
    }
},{timestamps:true});

// now we are creating the model of the schema defined above.
const User = mongoose.model("User",userSchema);

export default User;