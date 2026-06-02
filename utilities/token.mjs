import jwt from "jsonwebtoken"

export function generateToken(user,secret,exp){
    // this function generates token ,can be used for regular and refresh token 

    if(!secret){
        throw new Error("JWT secret error")
    }

    return jwt.sign({
        id:user.id,
        name:user.name,
        email:user.email
    },secret,{
        expiresIn:exp
    })
}
