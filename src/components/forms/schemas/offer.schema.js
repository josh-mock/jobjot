import * as yup from "yup";

export const offerSchema = yup.object({
  salaryOffered: yup.string().required("Required"),
  annualLeave: yup.string().required("Required"),
  benefits: yup.string(),
  responseDeadline: yup.date().nullable(),
  notes: yup.string(),
});
