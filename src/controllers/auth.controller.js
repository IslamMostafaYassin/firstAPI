const User=require('../models/user.model.js')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const AppError=require("../utils/AppError.js")

const COOKIE_OPTIONS={
			maxAge:3*60*1000,
			httpOnly:true,
			secure:process.env.NODE_ENV === 'production'
		}

const register=async(req,res,next)=>{
	try{
		const admin=await User.find()
		console.log(admin)
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

		res.cookie("jwt",token,COOKIE_OPTIONS)
		return res.status(201).send({
			success:true,
			message:"registration successful",
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
		const validPassword=await bcrypt.compare(password,existingUser.password)
		if (!validPassword){
			throw new AppError(400,"invalid credentials")
		}

		const token=jwt.sign({
			userId:existingUser._id,
			role:existingUser.role
		},process.env.JWT_SECRET,{
			expiresIn:'3m'
		})

		res.cookie("jwt",token,COOKIE_OPTIONS)

		return res.send({
			success:true,
			message:"login successful",
		})
	}catch(err){
		next(err)
	}
}

const signout=(req,res)=>{
	res.clearCookie("jwt",COOKIE_OPTIONS)

	return res.send({
		success:true,
		message:"signout successful"
	})
}

const getProfile=async(req,res,next)=>{
	res.send({
			success:true,
			message:"you are authenticated"
		})
}

const adminOnlyHandler=async(req,res,next)=>{
	res.send({
			success:true,
			message:"Welcome, admin!"
		})
}
module.exports={register,login,signout,getProfile,adminOnlyHandler}