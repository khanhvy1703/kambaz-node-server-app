import QuizAttemptsDao from "./dao.js";
import Quiz from "../Quizzes/model.js";
import QuizAttempt from "./model.js";

export default function QuizAttemptsRoutes(app) {
  const dao = QuizAttemptsDao();

  const submitAttempt = async (req, res) => {
    try {
      // FIXED: support multiple possible session keys
      const userId =
        req.session.currentUser?._id ||
        req.session.user?._id ||
        req.user?._id;

      if (!userId) return res.sendStatus(401);

      const quizId = req.params.qid;
      const { answers, startedAt, finishedAt } = req.body;

      // LOAD QUIZ
      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });

      // COUNT PREVIOUS
      const previous = await QuizAttempt.find({
        quiz: quizId,
        user: userId,
      });

      const attemptNumber = previous.length + 1;

      // =====================
      // SCORING
      // =====================
      let score = 0;

      quiz.questions.forEach((q) => {
        const studentAns = answers[q._id];

        if (q.type === "MC" || q.type === "TF") {
          if (studentAns === q.correctAnswer[0]) score += q.points;
        }

        if (q.type === "FILL") {
          const correct = q.correctAnswer.map((a) => a.trim().toLowerCase());
          if (correct.includes(studentAns?.trim().toLowerCase())) {
            score += q.points;
          }
        }
      });

      // CREATE ATTEMPT
      const attempt = await QuizAttempt.create({
        quiz: quizId,
        user: userId,
        attemptNumber,
        answers,
        score,
        startedAt,
        finishedAt,
      });

      res.json(attempt);
    } catch (err) {
      console.error("SUBMIT ATTEMPT ERROR:", err);
      res.status(500).json({ error: "Failed to submit attempt" });
    }
  };

  const findAttemptsForQuiz = async (req, res) => {
    const userId =
      req.session.currentUser?._id ||
      req.session.user?._id ||
      req.user?._id;

    if (!userId) return res.sendStatus(401);

    const attempts = await dao.findAttemptsForUserQuiz(req.params.qid, userId);
    res.json(attempts);
  }

  app.get("/api/quizzes/:qid/attempts", findAttemptsForQuiz);
  app.post("/api/quizzes/:qid/attempts", submitAttempt);
}
