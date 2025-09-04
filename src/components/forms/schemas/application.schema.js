import * as yup from "yup";

export const applicationSchema = yup.object({
  keySkills: yup.string(),
  responsibilities: yup.string(),
  requirements: yup.string(),
  applicationTasks: yup.array().of(
    yup.object({
      taskName: yup.string().required("Required"),
      taskStatus: yup
        .string()
        .required("Required")
        .oneOf(["Not Started", "In Progress", "Done"]),
      documentUrl: yup.string().url("Must be a valid URL").nullable(),
    })
  ),
});
