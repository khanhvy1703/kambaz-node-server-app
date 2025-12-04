import QuizzesDao from "./dao.js";
import Quiz from "./model.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  // ---------------- CREATE ----------------
  const createQuiz = async (req, res) => {
    const quiz = await dao.createQuiz(req.params.cid);
    res.json(quiz);
  };

  // ---------------- FIND ----------------
  const findQuizzesForCourse = async (req, res) => {
    res.json(await dao.findQuizzesForCourse(req.params.cid));
  };

  const findQuizById = async (req, res) => {
    res.json(await dao.findQuizById(req.params.qid));
  };

  // ---------------- UPDATE / DELETE ----------------
  const updateQuiz = async (req, res) => {
    const status = await dao.updateQuiz(req.params.qid, req.body);
    res.json(status);
  };

  const deleteQuiz = async (req, res) => {
    res.json(await dao.deleteQuiz(req.params.qid));
  };

  const togglePublish = async (req, res) => {
    res.json(await dao.togglePublish(req.params.qid));
  };

  // ---------------- ROUTES ----------------
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:qid", findQuizById);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.put("/api/quizzes/:qid/publish", togglePublish);
}
