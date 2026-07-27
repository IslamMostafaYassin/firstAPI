const User=require('../models/user.model.js')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const AppError=require("../utils/AppError.js")

const register=async(req,res,next)=>{
	try{
		const {username,email,password}=req.body
		const hashedPassword=await bcrypt.hash(password,10)
		const user=await User.create({
			username,
			email,
			password:hashedPassword
		})
		const token=jwt.sign({
			userId:user._id,
			role:user.role
		},
		process.env.JWT_SECRET,{
			expiresIn:'3m'
		})
		user.password=undefined
		return res.status(201).send({
			success:true,
			message:"user created successfully!",
			token,
			user
		})

	}catch(err){
		next(err)
	}
}



module.exports={register}