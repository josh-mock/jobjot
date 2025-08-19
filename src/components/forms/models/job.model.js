import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true, default: "" },
  salary: { type: String, default: "" },
  company: { type: String, default: "" },
  location: { type: String, default: "" },
  jobAdUrl: { type: String, default: null },
  applicationDeadline: { type: Date, default: null },
  roleLikes: { type: String, default: "" },
  roleUnsure: { type: String, default: "" },
  matchingSkills: { type: String, default: "" },
  matchingExperiences: { type: String, default: "" },
});

export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
