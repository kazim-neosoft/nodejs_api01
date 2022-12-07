const jwt=require('jsonwebtoken');

// const jwtAuth=(req,res,next)=>{
//     try {

//         let token=req.headers.authorization;
//         if(token){
//             token=token.split(" ")[1];
//             jwt.verify(token,process.env.SECRET_KEY);
//         }
//         else{
//             res.status(401).json({message:"Unauthorized User"});
//         }
//         next();
        
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({message:error.message})
//     }
// }

const jwtAuth=()=>{
    return (req,res,next)=>{
        if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === 'Bearer'){
            let token=req.headers.authorization.split(' ')[1];
            jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
                if(err){
        return res.status(400).json({message:"Invalid token"})

                }
                else{
                    next();
                }
            })

        }else{
            res.status(400).json({message:"Please Provide a token"})
        }
    }
}
module.exports=jwtAuth;