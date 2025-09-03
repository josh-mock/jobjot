import mongoose from "mongoose";

const InterviewSchema = {
  interviewDate: { type: Date, required: true },
  location: { type: String },
  dressCode: { type: String },
  interviewTasks: {
    type: [
      {
        taskName: { type: String, required: true },
        taskStatus: { type: String, required: true },
        documentUrl: { type: String },
      },
    ],
  },
  interviewers: {
    type: [
      {
        interviewerName: { type: String, required: true },
        interviewerPosition: { type: String },
        linkedInUrl: { type: String },
      },
    ],
  },
  questionsToAsk: { type: String },
  potentialQuestions: { type: String },
  interviewComplete: { type: Boolean, required: true },
  whatWentWell: { type: String },
  couldDoBetter: { type: String },
  notes: { type: String },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: { type: String, required: true },
};

export const Interview =
  mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
