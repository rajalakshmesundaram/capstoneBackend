import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import user from "../Model/user.model.js"
dotenv.config()
export const authmiddleware=async(req,res,next)=>{
    const token=req.header("Authorization")
if(!token){
  return res.status(401).json({message:"Token is missing"})
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded
    console.log(req.user);
    const useradmin=await user.findById(req.user._id)
    if(useradmin.role != "admin"){
      return res.status(401).json({message:"Access deny"})
    }
    next()
} catch (error) {
    return res.status(500).json({error:"internal server error"})
}
}