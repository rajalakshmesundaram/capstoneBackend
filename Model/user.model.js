import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  token: String,
  codeKataMarks:Number,
  webkataMarks:Number,
  tasksMarks:Number,
  interviewMarks:Number,
  tasksDate:Date,
});
const user = mongoose.model('user',userSchema)
export default user