import jwt from 'jsonwebtoken';

const genToken = async (userId) => {
    // Logic to generate token
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
            //kab expire ho jayega if not login//
            // simple terms main it would get logout after 7-days//
            expiresIn: '7d',
        })
        return token;
    }catch(error){
        console.log("gen token error");
    }
}

export default genToken;