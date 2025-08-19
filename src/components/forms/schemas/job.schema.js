import * as yup from "yup";

export const jobSchema = yup.object({
  jobTitle: yup.string().required("Required"),
  salary: yup.string(),
  company: yup.string().required("Required"),
  location: yup.string(),
  jobAdUrl: yup.string().url("Must be a valid URL").nullable(),
  applicationDeadline: yup.date().nullable(),
  roleLikes: yup.string(),
  roleUnsure: yup.string(),
  matchingSkills: yup.string(),
  matchingExperiences: yup.string(),
});
