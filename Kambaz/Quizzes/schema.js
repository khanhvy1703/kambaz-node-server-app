import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  type: { type: String, enum: ["MC", "TF", "FILL", "ESSAY"], default: "MC" },
  choices: [String],
  correctAnswer: String,
  points: { type: Number, default: 1 },
});

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    course: String, // course ID
    title: String,
    description: String,
    published: { type: Boolean, default: false },
    points: { type: Number, default: 0 },

    availableAt: Date,
    availableUntil: Date,
    dueDate: Date,

    questions: [questionSchema],
  },
  { collection: "quizzes" }
);

export default quizSchema;
