const jwt = require("jsonwebtoken")
const userModel = require('../../models/userModel')
const adminModel = require('../../models/admin')
const bcrypt = require("bcrypt")
const maxAge = 3*34*60*60
const createToken = (id)=>{
    return jwt.sign({id},"HELLOADMIN",{
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
exports.Admin_login = async(req,res)=>{
    try {
        const{email} = req.body;
         const check = await adminModel.findOne({email:email});
        
        if(check){
           
            const token = createToken(check._id);

            res.cookie("jwt",token,{
                withCrdentials : true,
                httpOnly:false,
                maxAge: maxAge * 1000,
            })
            res.status(201).json({admin:check._id,created:true,token})
        }else{
            res.json({message:"password not matching" , status:false})
        }
        
    } catch (error) {
        console.log(error);
    }
}

exports.admin_Home = async(req,res)=>{
    try {
        const userData = await userModel.find()
        res.json({action:true , userData})
    } catch (error) {
      console.log(error);
    }
}

exports.user_details = async(req,res)=>{
    try {
       const id = req.params.id;
       const userDetails = await userModel.findOne({_id:id})
       res.json({userDetails})
        
    } catch (error) {
        console.log(error);
    }
}

exports.user_edit = async(req,res)=>{
    try {
        console.log(req.body);
        const {userId,fname,lname} = req.body
        // if(fname&&lname){
        //     res.json({check:true})
        // }
        if(fname === undefined || lname===undefined){
            await userModel.updateOne({_id:userId},{
                $set:{
                    fname:fname,
                    lname:lname
                }
            })
            res.json({action:true})
        }
       
     await userModel.updateOne({_id:userId},{
            $set:{
                fname:fname,
                lname:lname
            }
        })
         res.json({status:true})
      
        
    } catch (error) {
        console.log(error);
    }
}

exports.user_Delete = async(req,res)=>{
    try {
        const id = req.params.id;
        await userModel.deleteOne({_id:id})
        res.status(201).json({message:"userDelete" , action:true})
    } catch (error) {
        console.log(error);
    }
}

exports.addUser_data = async(req,res)=>{
    try {
        const { fname,lname,email,password } = req.body;
        const spassword = await securePassword(password);
          const userExisted = await userModel.findOne({email})
          if(userExisted){
             res.json({message:"Email is already registered" , status:false})
          }else{
         const user = await userModel.create({fname,lname,email,password:spassword})
         console.log(user);
       
         res.status(201).json({user:user._id,created:true})
     }
    } catch (error) {
        console.log(error);
    }
}