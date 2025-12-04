import QuizAttemptModel from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizAttemptsDao() {
  
  const createAttempt = async (quizId, userId, score, answers, startedAt, finishedAt) => {
    const prevAttempts = await QuizAttemptModel.find({ quiz: quizId, user: userId });
    const attemptNumber = prevAttempts.length + 1;

    const attempt = {
      _id: uuidv4(),
      quiz: quizId,
      user: userId,
      attemptNumber,
      score,
      answers,
      startedAt,
      finishedAt
    };

    return QuizAttemptModel.create(attempt);
  };

  const findAttemptsForUserQuiz = (quizId, userId) => {
    return QuizAttemptModel.find({ quiz: quizId, user: userId });
  };

  return {
    createAttempt,
    findAttemptsForUserQuiz
  };
}