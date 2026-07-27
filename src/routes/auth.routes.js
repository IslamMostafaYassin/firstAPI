const express=require("express")
const {register}=require("../controllers/auth.controller.js")
const validate=require("../middleware/validate.middleware.js")
const {registerSchema}=require("../schemas/auth.schema.js")


const router=express.Router()

router.post("/register",validate(registerSchema),register)

module.exports=router