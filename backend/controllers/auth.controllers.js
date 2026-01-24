import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
// first we will create the user//
export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkUserByUserName = await User.findOne({ userName });
    if (checkUserByUserName) {
      return res.status(400).json({ message: "userName already exists" });
    }
    const checkUserByUserEmail = await User.findOne({ email });
    if (checkUserByUserEmail) {
      return res.status(400).json({ message: "email already exists" });
    }
    
    // for password must be of 6-char to get signed in//
    if (password.length < 6) {
        return res.status(400).json({ message: "password must be at least 6 characters" });
    }

    // check the password with the help of bcrypt js//
    const hashedPassword = await bcrypt.hash(password, 10); // salt means strong password meaning 10 seems to be a strong password//

    const user= await User.create({
        userName, email, password:hashedPassword,
    });

    
    // now we will create the token for the user to keep them signed in//
    // we will use cookie and jwt for that//
    const token = await genToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({user})

  } catch (error) {
    return res.status(500).json({ message: `signup error ${error}` });
  }
}


//for LOGIN//
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    // passowrd ko check karne ke liye bcrypt ka use karenge//
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }


    // now we will create the token for the user to keep them signed in//
    // we will use cookie and jwt for that//
    const token = await genToken(user._id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({user})

  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
}


//for LOGOUT//(since no token is stored in backend, we will just clear the cookie)
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout successful" });
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error}` });
    }
}
