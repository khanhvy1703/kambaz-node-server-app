import QuizModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
  const createQuiz = (cid) => {
    const quiz = {
      _id: uuidv4(),
      course: cid,
      title: "New Quiz",
      published: false,
      questions: [],
    };
    return QuizModel.create(quiz);
  };

  const findQuizzesForCourse = (cid) =>
    QuizModel.find({ course: cid });

  const findQuizById = (qid) =>
    QuizModel.findById(qid);

  const updateQuiz = (qid, quiz) =>
    QuizModel.updateOne({ _id: qid }, { $set: quiz });

  const deleteQuiz = (qid) =>
    QuizModel.findByIdAndDelete(qid);

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
