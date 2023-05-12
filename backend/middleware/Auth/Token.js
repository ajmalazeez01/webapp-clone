const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')

exports.checkUser  = (req,res,next) =>{
      try {
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token,"HELLOHI",async(err,decodedToken)=>{
                if(err){
                    res.json({status : false});
                    next();
                }else{
                    const userVerify = await userModel.findById(decodedToken.id);
                    if(userVerify) res.json({status:true , user: userVerify.email});
                    else  res.json({status : false});
                    next();
                }
            })
        }else{
            res.json({status : false});
                    next();
        }
        
      } catch (error) {
        console.log(error);
      }
}