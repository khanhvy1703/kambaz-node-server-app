import "dotenv/config";
import session from "express-session";
import express from "express";
import cors from "cors";

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

/* ---------------- CORS (must be first) ---------------- */
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

/* ---------------- Session Config ---------------- */
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

// Production ONLY: secure cookies
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

// Development: NO cookie settings → secure: false, sameSite: "lax"
app.use(session(sessionOptions));

/* ---------------- JSON Parsing ---------------- */
app.use(express.json());

/* ---------------- Routes ---------------- */
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);

/* ---------------- Server ---------------- */
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running");
});
