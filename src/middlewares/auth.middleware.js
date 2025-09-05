import userModel from "../models/user.model.js"
import  jwt  from "jsonwebtoken"



const authUser = async(req,res,next)=>{
  const {token} = req.cookies

  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await userModel.findById(decoded.id)
    next()
  } catch (error) {
    return res.status(401).json({message:"Unauthorized"})
  }
}


export default authUser