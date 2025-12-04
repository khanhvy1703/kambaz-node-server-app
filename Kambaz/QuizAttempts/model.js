import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const attemptSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    quiz: String,       
    user: String,       
    attemptNumber: Number,
    score: Number,
    answers: Object,
    startedAt: Date,
    finishedAt: Date,
  },
  { collection: "quiz_attempts" }
);

const QuizAttemptModel = mongoose.model("QuizAttemptModel", attemptSchema);
export default QuizAttemptModel;
