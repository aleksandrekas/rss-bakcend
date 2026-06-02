import jwt from "jsonwebtoken"



export function authenticateToken(request,response,next){
    // this middleware authenticates token and  passes it to next middleware
    
    const header = request.header["authorization"]
    if(!header){
        return response.status(404).json({error:"header missing!"})
    }
    const token = header.split(' ')[1]

    jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{
        if(error){
            return response.status(403).json({error:error})
        }else{
            request.user = user
            next()
        }
    })
}




