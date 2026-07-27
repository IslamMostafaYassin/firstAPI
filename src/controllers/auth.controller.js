const User=require('../models/user.model.js')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const register=async(req,res,next)=>{
	try{
		const {username,email,password}=req.body
		const existingUser=await User.findOne({email})
		if(existingUser){
			return res.status(400).send({
				success:false,
				message:"User already exists"
			})
		}
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