import { response, Router } from "express";
import dataBase from "../utilities/db.mjs";
import bcrypt from "bcrypt";


const loginRouter = Router()


function loginAuth(request,response,next){
    if (!request.body || Object.keys(request.body).length === 0) {
        return response.status(400).send("body is empty: no user info was provided" );
    }
    const {email,password} = request.body
    const errors = []
    const mailRegex =/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


    if(email === '' || !mailRegex.test(email)){
        email ==="" ? 
            errors.push("no email provided")
        :
            errors.push("invalid email provided")
    }

    if(password === ""){
        errors.push("no password is provided")
    }

    next()   
}





loginRouter.post('/',loginAuth,(request,response)=>{
    const {email,password} = request.body
    const userQuery = "select * from users where email = $1"

    dataBase.query(userQuery,[email],(error,result)=>{
        if(error){
            return response.status(500).send(error)
        }
        if(result.rows.length === 0){
            return response.send("user with current email does not exist")
        }else{
            const user = result.rows[0]
            const passwordMatch = bcrypt.compare(password,user.password)

            if(!passwordMatch){
                return response.send("wrong password")
            }

            response.send(user)
        }
    })
})




export default loginRouter

