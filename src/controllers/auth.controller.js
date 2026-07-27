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
			message:"registeration successful",
			token,
			user
		})

	}catch(err){
		next(err)
	}
}

const login=async(req,res,next)=>{
	try{
		const {email,password}=req.body
		const existingUser=await User.findOne({email})
		if (!existingUser){
			throw new AppError(400,"invalid credentials")
		}
		const validPassword=bcrypt.compare(password,existingUser.password)
		if (!validPassword){
			throw new AppError(400,"invalid credentials")
		}
		const token=jwt.sign({
			userId:existingUser.id,
			role:existingUser.role
		},process.env.JWT_SECRET,{
			expiresIn:'3m'
		})
		return res.send({
			success:true,
			message:"login successful",
			token
		})
	}catch(err){
		next(err)
	}


}

module.exports={register,login}