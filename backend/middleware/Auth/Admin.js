const adminModel = require('../../models/admin')
const jwt = require('jsonwebtoken')
exports.checkUser  = (req,res,next) =>{
      try {
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token,"HELLOADMIN",async(err,decodedToken)=>{
                if(err){
                    res.json({status : false});
                    next();
                }else{
                    const userVerify = await adminModel.findById(decodedToken.id);
                    if(userVerify) res.json({status:true , user: userVerify.Email});
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