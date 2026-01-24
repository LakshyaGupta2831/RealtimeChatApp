import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const useGetCurrentUser = async (req, res) => {
    try {
        let userId = req.userId; //getting userId from req object which is set in isAuth middleware//
        //fetch user from db using userId//
        //Assuming User is a mongoose model
        let user = await User.findById(userId).select("-password"); //excluding password field//
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: `current user error: ${error}` });
    }
}

export const editProfile = async (req, res) => {
    try {
        let {userName} = req.body;
        let image;
        if(req.file){
            image =await uploadOnCloudinary(req.file.path) //getting image path from multer middleware//
        }

        let user=await User.findByIdAndUpdate(req.userId,{
            userName,
            image
        },{new:true})

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({ message: `profile error: ${error}` });
    }
}

export const useGetOtherUsers = async (req, res) => {
    try {
        let users = await User.find({_id: {$ne: req.userId}}).select("-password"); //excluding password and email fields//
        return res.status(200).json(users); 
    } catch (error) {
        return res.status(500).json({ message: `get other users error: ${error}` });
    }
}

export const search = async (req, res) => {
  try {
    let { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "query is required" });
    }

    const users = await User.find({
      $or: [
        { userName: { $regex: query, $options: "i" } },
        // { email: { $regex: query, $options: "i" } } // optional
      ]
    }).select("-password");

    return res.status(200).json(users);

  } catch (error) {
    return res.status(500).json({ message: `search users error: ${error}` });
  }
};
