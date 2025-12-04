import QuizModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
  const createQuiz = (cid) => {
    const quiz = {
      _id: uuidv4(),
      course: cid,
      title: "New Quiz",
      description: "",

      type: "Graded Quiz",
      group: "QUIZZES",

      shuffleAnswers: false,
      timeLimitEnabled: false,
      timeLimit: 20,

      multipleAttempts: false,
      attemptsAllowed: 1,

      showCorrectAnswers: false,
      accessCode: "",

      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestions: false,

      published: false,
      points: 0,

      availableAt: null,
      availableUntil: null,
      dueDate: null,

      questions: [],
    };
    return QuizModel.create(quiz);
  };

  const findQuizzesForCourse = (cid) => QuizModel.find({ course: cid });

  const findQuizById = (qid) => QuizModel.findById(qid);

  const updateQuiz = async (qid, quiz) => {
    return QuizModel.findByIdAndUpdate(
      qid,
      { $set: quiz },
      { new: true, runValidators: true }
    );
  };

  const deleteQuiz = (qid) => QuizModel.findByIdAndDelete(qid);

  const togglePublish = async (qid) => {
    const quiz = await QuizModel.findById(qid);
    quiz.published = !quiz.published;
    await quiz.save();
    return quiz;
  };

  return {
    createQuiz,
    findQuizzesForCourse,
    findQuizById,
    updateQuiz,
    deleteQuiz,
    togglePublish,
  };
}
