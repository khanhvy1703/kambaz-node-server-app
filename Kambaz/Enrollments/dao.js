import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  const findEnrollmentsForUser = (userId) => {
    return db.enrollments.filter((e) => e.user === userId);
  };

  const enrollUserInCourse = (userId, courseId) => {
    const exists = db.enrollments.some(
      (e) => e.user === userId && e.course === courseId
    );
    
    if (!exists) {
      db.enrollments.push({
        _id: uuidv4(),
        user: userId,
        course: courseId,
      });
    }
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
  };

  return {
    findEnrollmentsForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
