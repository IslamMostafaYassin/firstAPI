const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const cors=require("cors")
const connectDB=require("./config/db.config.js")
const globalErrorHandler=require("./middleware/error.middleware.js")
const authRouter=require("./routes/auth.routes.js")
const User=require("./models/user.model.js")

const app=express()
connectDB()

app.use(cors())
app.use(express.json())

app.get("/api/v1",(req,res)=>{
	res.send("welcome to my firstAPI!")
})
app.use("/api/v1/auth",authRouter)

app.use(globalErrorHandler)

const PORT=process.env.PORT

app.listen(PORT,()=>{
	console.log("listening on port "+PORT)
})