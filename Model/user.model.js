import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  token: String,
  capfrontsmarks: String,
  capbacksmarks: String,
  capfrontdmarks: String,
  capbackdmarks: String,
  webfrontsmarks: String,
  webbacksmarks: String,
  webfrontdmarks: String,
  webbackdmarks: String,
  codeKataScores: [{ day: String, score: Number }],
  webKataScores: [{ day: String, score: Number }],
  taskMarks: [{ task: String, score: Number }],
  interviewMarks: { type: Number, default: 0 },
  capstoneMarks: { type: Number, default: 0 },
  webCodeMarks: { type: Number, default: 0 },
});
const user = mongoose.model('user',userSchema)
export default user