import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: String,
    course: { type: String, required: true },
    description: String,
    availableFrom: Date,
    dueDate: Date,
    points: Number,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
