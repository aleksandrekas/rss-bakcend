import { Router } from "express";
import bcrypt from "bcrypt";




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





signupRouter.post('/',headerAuth,async (request,response)=>{
    const  {username,email,password} = request.body
    const hashedpassword = await bcrypt.hash(password,13)



    response.send({
        user:username,
        email:email,
        password:hashedpassword
    })
})


export default signupRouter