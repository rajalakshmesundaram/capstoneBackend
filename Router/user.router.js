import express from 'express'
import { capstoneMarksById, createUser, forgotPassword, getUser, getUserById, getalluser, loginUser, marksById, resetpassword, saveRandomTaskMarksForUsers, webcodeMarksById } from '../Controller/user.controller.js'
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
router.post('/getcapstone/:id',capstoneMarksById)
router.post('/getwebcode/:id',webcodeMarksById)
export default router