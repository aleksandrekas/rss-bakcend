import { Router } from "express";
import bcrypt from "bcrypt";
import dataBase from "../utilities/db.mjs";



const signupRouter = Router()


function headerAuth(request, response, next) {
    if (!request.body || Object.keys(request.body).length === 0) {
        return response.status(400).send("body is empty: no user info was provided" );
    }

    const { username, email, password } = request.body;

    const mailRegex =/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const errors = [];

    if (!email) {
        errors.push("email is empty");
    } else if (!mailRegex.test(email)) {
        errors.push("wrong email");
    }

    if (!username) {
        errors.push("username is empty");
    }

    if (!password) {
        errors.push("password is empty");
    }

    if (errors.length > 0) {
        return response.status(400).send( errors );
    }

    next();
}





signupRouter.post('/',headerAuth, async (request,response)=>{
    const  {username,email,password} = request.body
    const hashedpassword = await bcrypt.hash(password,13)

    const signupQuery = `insert into users(username,email,password,theme,refinterval) values($1,$2,$3,$4,$5)`
    const userQuery = `select id from users where email = $1`

    dataBase.query(userQuery,[emal],async (error,result)=>{
        if(error){
            return response.status(500).send(error)
        }
        if(result.rows[0].length === 0){
            await dataBase.query(signupQuery,[username,email,hashedpassword,"light",5],(error)=>{
                if(error){
                    return response.status(500).send(error)
                }else{
                    return response.status(200).send("register succesfull")
                }
            })
        }else{
            return response.send("email registered")
        }
    })



})


export default signupRouter