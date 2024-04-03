import express from 'express'
import { createUser, forgotPassword, getUser, getUserById, getalluser, loginUser, marksById, resetpassword } from '../Controller/user.controller.js'
import { authmiddleware } from '../Middleware/auth.middleware.js'
const router=express.Router()

router.post('/createUser',createUser)
router.post('/loginUser',loginUser)
router.post("/forgotpassword",forgotPassword);
router.post("/resetpassword",resetpassword);
router.get("/getuser",authmiddleware,getUser)
router.get('/getalluser',getalluser)
router.post('/getMarks/:id',marksById)
router.get("/getusermarks/:userId",getUserById);
export default router