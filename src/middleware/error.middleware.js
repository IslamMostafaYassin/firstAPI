const {ZodError}=require("zod")
const mongoose=require("mongoose")

const globalErrorHandler=(err,req,res,next)=>{
	console.log(err)
	let message="Internal server error"
	if (err instanceof ZodError){
		if (err.errors[0])
			message=err.errors[0].message
		else
			message="Input validation error"

		return res.status(400).send({
			success:false,
			message
		})
	}
	if (err instanceof mongoose.Error || err.code === 11000){
		message="Database error"
		return res.status(400).send({
			success:false,
			message
		})
	}
	return res.status(500).send({
		success:false,
		message
	})
}

module.exports=globalErrorHandler