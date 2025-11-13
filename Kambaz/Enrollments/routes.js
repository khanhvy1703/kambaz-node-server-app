import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findAllEnrollments = (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  };

  const findEnrollmentsForUser = (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    const { user, course } = req.body;

    let userId = user;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    const enrollment = dao.enrollUserInCourse(userId, course);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    let { userId, courseId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }

    const success = dao.unenrollUserFromCourse(userId, courseId);
    if (success) {
      res.json({ status: "ok" });
    } else {
      res.status(404).json({ status: "not found" });
    }
  };

  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
}
