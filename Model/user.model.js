import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  token: String,
  frontsmarks: String,
  backsmarks: String,
  frontdmarks: String,
  backdmarks: String,
  codeKataScores: [{ day: String, score: Number }],
  webKataScores: [{ day: String, score: Number }],
  taskMarks: [{ task: String, score: Number }],
  interviewMarks: Number,
  capstoneMarks:  Number,
  webCodeMarks:  Number, 
});
const user = mongoose.model('user',userSchema)
export default user