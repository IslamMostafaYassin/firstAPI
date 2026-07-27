const express=require("express")
const {register,login}=require("../controllers/auth.controller.js")
const validate=require("../middleware/validate.middleware.js")
const {registerSchema,loginSchema}=require("../schemas/auth.schema.js")


const router=express.Router()

router.post("/register",validate(registerSchema),register)
router.post("/login",validate(loginSchema),login)

module.exports=router