import express from 'express'
import { createUser, forgotPassword, getUser, getUserById, getalluser, loginUser, marksById, resetpassword, saveRandomTaskMarksForUsers } from '../Controller/user.controller.js'
import { authmiddleware } from '../Middleware/auth.middleware.js'
const router=express.Router()

router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post("/forgotpassword",forgotPassword);
router.post("/resetpassword",resetpassword);
router.get("/getuser",authmiddleware,getUser)
router.get('/getalluser/:userId',getalluser)
router.post('/getMarks/:id',marksById)
router.get("/getusermarks/:userId",getUserById);
router.get("/randomuserdata/:userId",saveRandomTaskMarksForUsers)
export default router