import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
    try {
        // Authentication logic here, means if no token then no login//
        let token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "token is not found" });
        }

        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        // if (!verifyToken) {
        //     return res.status(400).json({ message: "token is invalid" });
        // }
        
        req.userId = verifyToken.userId; //setting userId in req object for further use in controllers//
        next();
    } catch (error) {
        return res.status(500).json({ message: `isauth error: ${error.message}` });
    }
}

export default isAuth;