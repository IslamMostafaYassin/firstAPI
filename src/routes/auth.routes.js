const express=require("express")
const {register,login,signout,getProfile,adminOnlyHandler}=require("../controllers/auth.controller.js")
const validate=require("../middleware/validate.middleware.js")
const {registerSchema,loginSchema}=require("../schemas/auth.schema.js")
const {authenticate,authorize}=require("../middleware/auth.middleware.js")


const router=express.Router()

router.post("/signup",validate(registerSchema),register)
router.post("/signin",validate(loginSchema),login)
router.get("/signout",signout)
router.get("/profile",authenticate,getProfile)
router.get("/admin-only",authenticate,authorize,adminOnlyHandler)

module.exports=router