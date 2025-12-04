import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
    res.json(assignments);
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    const assignment = await dao.findAssignmentById(req.params.assignmentId);
    res.json(assignment);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const assignment = {
      ...req.body,
      course: req.params.courseId,
    };
    const newAssignment = await dao.createAssignment(assignment);
    res.json(newAssignment);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const updated = await dao.updateAssignment(
      req.params.assignmentId,
      req.body
    );
    res.json(updated);
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const status = await dao.deleteAssignment(req.params.assignmentId);
    res.json(status);
  });
}