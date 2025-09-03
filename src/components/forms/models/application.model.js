import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  keySkills: { type: String, default: "" },
  responsibilities: { type: String, default: "" },
  requirements: { type: String, default: "" },
  applicationTasks: {
    type: [
      {
        taskName: { type: String, required: true },
        taskStatus: {
          type: String,
          required: true,
          enum: ["Not Started", "In Progress", "Done"],
        },
        documentUrl: { type: String },
      },
    ],
    default: [
      { taskName: "Update CV", taskStatus: "Not Started", documentUrl: null },
      {
        taskName: "Write Cover Letter",
        taskStatus: "Not Started",
        documentUrl: null,
      },
    ],
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: { type: String, required: true },
});

export const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
