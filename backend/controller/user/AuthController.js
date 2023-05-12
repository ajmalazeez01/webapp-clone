const userModel = require('../../models/userModel')
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const maxAge = 3*34*60*60
const createToken = (id)=>{
    return jwt.sign({id},"HELLOHI",{
        expiresIn:maxAge,
    })
}
const securePassword = async(password) =>{
    try {
        console.log('hashing password');
        const passwordHash = await bcrypt.hash(password , 10);
        return passwordHash
    } catch (error) {
        console.log(error);
    }
};

exports.Signup_page = async (req,res)=>{
    try {
        const { fname,lname,email,password } = req.body;
       const spassword = await securePassword(password);
         const userExisted = await userModel.findOne({email})
         if(userExisted){
            res.json({message:"Email is already registered" , status:false})
         }else{
        const user = await userModel.create({fname,lname,email,password:spassword})
        console.log(user);
        // const token = createToken(user._id);

        // res.cookie("jwt",token,{
        //     withCrdentials : true,
        //     httpOnly:false,
        //     maxAge: maxAge * 1000,
        // })
        res.status(201).json({user:user._id,created:true})
    }
    } catch (error) {
        console.log(error);
    }
}
exports.login_page = async(req,res)=>{
    try {
       let {email,password} = req.body;
       const userLogin = await userModel.findOne({email});
       if(userLogin){
        const match = await bcrypt.compare(
            password,
            userLogin.password
          );
          if (match) {
            const token = createToken(userLogin._id);

            res.cookie("jwt",token,{
                withCrdentials : true,
                httpOnly:false,
                maxAge: maxAge * 1000,
            })
            res.status(201).json({user:userLogin._id,created:true,userLogin})
          }else{
            res.json({message:"password not matching" , status:false})
          }
       }else{
        res.json({message:"Invalid Credentials" , action:false})
       }

    } catch (error) {
        console.log(error);
    }
}

exports.profile_page = async(req,res)=>{
    try {

        const UserId = req.params.id;
        const {filename} = req.file
       await userModel.updateOne({_id:UserId},{$set:{image:filename}})
        const userDatas = await userModel.findOne({_id:UserId})
        res.json({userDatas,active:true})

    } catch (error) {
        console.log(error);
    }
}
exports.upload_Image = async(req,res)=>{
    try {
        const {id} = req.body
        const showUser = await userModel.findOne({_id:id})
       res.json({showUser,active:true})

        
    } catch (error) {
        console.log(error);
    }
}