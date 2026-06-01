import jwt from "jsonwebtoken"

export function generateToken(user,secret,exp){
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
