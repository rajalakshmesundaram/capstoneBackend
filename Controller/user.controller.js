import bcrypt from "bcryptjs"
import user from "../Model/user.model.js"
import mail from "../Service/nodemailer.js"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import { fa, faker } from "@faker-js/faker"

dotenv.config()
export const createUser= async(req,res)=>{
    try {
        const{name, email,password,role}=req.body
         const existingUser = await user.findOne({ email });
         if (existingUser) {
           return res.status(200).json({ message: "user Exist" });
         }
        const hashPassword=await bcrypt.hash(password,10)
        const userRegister= new user({name,email,password:hashPassword,role})
        await userRegister.save()
       
        console.log(userRegister);
        res
          .status(200)
          .json({ message: "Successfully Register", user: user });
        
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "server error" });
    }
}
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await user.findOne({ email });
    if (!userLogin) {
      return res.status(401).json({ message: "Invalid User Name" });
    }
    const passwordMatch = await bcrypt.compare(password, userLogin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ _id: userLogin._id }, process.env.JWT_SECRET);
    userLogin.token = token;
    await userLogin.save();
    res.status(200).json({ message: "login successful" ,token:token,userlogin:userLogin});
  } catch (error) {
    res.status(500).json({ errormessage: "internal server error" });
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const userlogin = await user.findOne({ email});
  if (!userlogin) {
    return res.status(404).json({ message: "Invalid User Name" });
  }
  const token=jwt.sign({_id:userlogin._id},process.env.JWT_SECRET)
   userlogin.token=token
   await userlogin.save()
  mail(email,token);
  res.status(200).json({ message: "Mail Send Successfully" });
};
// Endpoint to handle password reset
export const resetpassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Find user by reset token
  const userReset = await user.findOne({ token:token });
  if (!userReset) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  // Update user's password and clear reset token
   const hashPassword = await bcrypt.hash(newPassword, 10);
  userReset.password = hashPassword;
  userReset.token = null;

  await userReset.save();

  res.status(200).json({ message: "Password reset successfully" });
};

export const getUser=async(req,res)=>{
  try{
  const userId=req.user._id
  const userfind=await user.findById(userId)
  res.status(200).json({message:"Authorized user",data:userfind})
  }
  catch(error){
 res.status(500).json({error:"Internel server error"})
  }
  
}
export const getalluser=async(req,res)=>{
  try {
    const userId=req.user._id
    const users = await user.findById(userId)
    res.status(200).json({message:users});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const marksById=async(req,res)=>{
  try {
    const { id } = req.params;
    const { frontsmarks, backsmarks, frontdmarks, backdmarks } = req.body;
    const userMarks=await user.findById(id)
    userMarks.frontsmarks=frontsmarks
    userMarks.backsmarks=backsmarks
    userMarks.frontdmarks=frontdmarks
    userMarks.backdmarks=backdmarks
    
    await userMarks.save()
res.status(200).json({ message: userMarks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUserById = async (req, res) => {
  try {
    const {userId}=req.params
    const userid = await user.findById(userId);
    if (!userid) {
      return res.status(404).json({ message: "Studemt not found" });
    }
    res.status(200).json({message:userid});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function generateRandomData() {
  // Generate random data
  const taskMarks = Array.from({ length: 30 }, () => ({
    task: faker.lorem.word(),
    score: Math.round(Math.random() * 10),
  }));
  const interviewMarks =Math.round(Math.random() * 10);
  const webCodeMarks = Math.round(Math.random() * 10);
  const capstoneMarks = Math.round(Math.random() * 10);
  
  const codeKataScores = Array.from({ length: 3 }, () => ({
    day: faker.date.past().toISOString().split("T")[0],
    score: Math.round(Math.random() * 100),
  }));
  const webKataScores = Array.from({ length: 3 }, () => ({
    day: faker.date.past().toISOString().split("T")[0],
    score: Math.round(Math.random() * 100),
  }));

  return {
    taskMarks,
    interviewMarks,
    webCodeMarks,
    capstoneMarks,
    codeKataScores,
    webKataScores,
  };
}

export const saveRandomTaskMarksForUsers=async(req,res)=> {
    try {
        // Retrieve users from the database (assuming you already have users)
        const { userId } = req.params;
        const users = await user.findById(userId);
        

        // Loop through each user and generate random task marks
        
            const {taskMarks,interviewMarks,webCodeMarks,capstoneMarks,codeKataScores,webKataScores} = generateRandomData();

            // Update user with generated task marks
            users.taskMarks = taskMarks;
            users.interviewMarks=interviewMarks;
            users.webCodeMarks=webCodeMarks;
            users.capstoneMarks=capstoneMarks;
            users.codeKataScores=codeKataScores;
            users.webKataScores=webKataScores;
            // Save user with updated marks
            await users.save();
            console.log(`Random task marks saved for user: ${users.username}`);
            res.status(200).json({ message: users });
        }
    catch (error) {
        console.error('Error saving random task marks:', error);
         res.status(500).json({ message: "Internal server error" });
    }
}