import * as yup from "yup";

export const archiveSchema = yup.object({
  dateClosed: yup.date().required("Required"),
  reasonForClosing: yup.string().required("Required"),
  feedbackReceived: yup.string(),
  reflection: yup.string(),
});
