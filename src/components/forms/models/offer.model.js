import mongoose from "mongoose";

const offerSchema = {
  salaryOffered: { type: String, required: true },
  annualLeave: { type: String, required: true },
  benefits: { type: String },
  responseDeadline: { type: Date },
  notes: { type: String },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  userId: { type: String, required: true },
};

export const Offer =
  mongoose.models.Offer || mongoose.model("Offer", offerSchema);
