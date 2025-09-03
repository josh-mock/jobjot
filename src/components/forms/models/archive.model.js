import mongoose from "mongoose";

const archiveSchema = {
  dateClosed: { type: Date, required: true },
  reasonForClosing: { type: String, required: true },
  feedbackReceived: { type: String },
  reflection: { type: String },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: { type: String, required: true },
};

export const Archive =
  mongoose.models.Archive || mongoose.model("Archive", archiveSchema);
