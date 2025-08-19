import * as yup from "yup";

export const interviewSchema = yup.object({
  interviewDate: yup.date().required("Required"),
  location: yup.string().required("Required"),
  dressCode: yup.string(),
  interviewTasks: yup.array().of(
    yup.object({
      taskName: yup.string().required("Required"),
      taskStatus: yup
        .string()
        .required("Required")
        .oneOf(["Not Started", "In Progress", "Done"]),
      documentUrl: yup.string().url().nullable(),
    })
  ),
  interviewers: yup.array().of(
    yup.object({
      interviewerName: yup.string().required("Required"),
      interviewerPosition: yup.string(),
      linkedInUrl: yup.string().url().nullable(),
    })
  ),
  questionsToAsk: yup.string(),
  potentialQuestions: yup.string(),
  interviewComplete: yup.boolean().required("Required"),
  whatWentWell: yup.string(),
  couldDoBetter: yup.string(),
  notes: yup.string(),
});
