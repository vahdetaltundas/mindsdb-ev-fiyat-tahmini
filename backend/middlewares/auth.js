const jwt=require("jsonwebtoken");

const createToken = async (res,user)=>{
    console.log(user);
    const payload={
        sub:user.id,
        username:user.username
    }

    const token= await jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        algorithm:"HS512",
        expiresIn:process.env.JWT_EXPIRES_IN
    })
    return res.status(201).json({
        success:true,
        token:token,
        message:"Giriş Başarılı"
    })
}
module.exports=createToken;