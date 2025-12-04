import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  type: { type: String, enum: ["MC", "TF", "FILL"], default: "MC" },
  title: String,
  questionDescription: { type: String, default: "" },
  choices: [String], // MC = option list, TF = ["True","False"], FILL = []
  correctAnswer: [String],
  points: { type: Number, default: 1 },
});

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    course: String,
    title: String,
    description: String,
    type: { type: String, default: "Graded Quiz" },
    group: { type: String, default: "QUIZZES" },

    shuffleAnswers: { type: Boolean, default: false },
    timeLimitEnabled: { type: Boolean, default: false },
    timeLimit: { type: Number, default: 20 },

    multipleAttempts: { type: Boolean, default: false },
    attemptsAllowed: { type: Number, default: 1 },

    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },

    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestions: { type: Boolean, default: false },

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
