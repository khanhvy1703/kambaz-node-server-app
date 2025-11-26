import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

const allowedFields = [
  "_id",
  "title",
  "course",
  "description",
  "availableFrom",
  "dueDate",
  "points",
];

const clean = (data) => {
  const result = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined) result[key] = data[key];
  }
  return result;
};

export const findAssignmentsForCourse = (courseId) =>
  model.find({ course: courseId });

export const findAssignmentById = (id) =>
  model.findById(id);

export const createAssignment = async (assignment) => {
  const cleanAssignment = clean(assignment);

  cleanAssignment._id = uuidv4();

  return model.create(cleanAssignment);
};

export const updateAssignment = async (id, updates) => {
  const cleanUpdates = clean(updates);
  return model.findByIdAndUpdate(id, cleanUpdates, { new: true });
};

export const deleteAssignment = (id) =>
  model.deleteOne({ _id: id });