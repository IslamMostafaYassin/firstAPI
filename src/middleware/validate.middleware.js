const validate=(schema)=>{
	return (req,res,next)=>{
		try{
			req.body=schema.parse(req.body)
		}catch(err){
			next(err)
		}
	}
}