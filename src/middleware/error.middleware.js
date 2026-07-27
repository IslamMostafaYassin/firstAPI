const {ZodError}=require("zod")

const globalErrorHandler=(err,req,res,next)=>{
	if (err instanceof ZodError){
		return res.status(400).send({
			success:false,
			message:"Validation error"
		})
	}
	return res.status(500).send({
		success:false,
		message:"Internal server error"
	})
}

module.exports=globalErrorHandler