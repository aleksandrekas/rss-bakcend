import express from "express"
import cookieParser from "cookie-parser"
import signupRouter from "./routes/signup.mjs"
import dataBase from "./utilities/db.mjs"
import loginRouter from "./routes/login.mjs"

const app = express()


app.use(express.json())
app.use(cookieParser())

dataBase.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connection succesfull')
    }
})







app.use("/api/signup",signupRouter)
app.use("/api/login",loginRouter)


app.listen(3000,()=>{
    console.log("runing on 3000")
})