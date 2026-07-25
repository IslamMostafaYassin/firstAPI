const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const cors=require("cors")


const app=express()

app.use(cors())
app.use(express.json())

app.get("/api/v1",(req,res)=>{
	res.send("welcome to my firstAPI!")
})

const PORT=process.env.PORT

app.listen(PORT,()=>{
	console.log("listening on port "+PORT)
})