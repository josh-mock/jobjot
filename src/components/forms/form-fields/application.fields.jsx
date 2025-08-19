"use client";
import { Button, Typography, Grid } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import {
  SelectElement,
  TextareaAutosizeElement,
  TextFieldElement,
} from "react-hook-form-mui";

export function ApplicationFormFields({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "applicationTasks",
  });

  return (
    <Grid container spacing={2}>
      {/* Skills */}
      <Grid size={12}>
        <Typography>
          What are the key skills listed in the job description? How do you meet
          them?
        </Typography>
        <TextareaAutosizeElement
          control={control}
          name="keySkills"
          minRows={3}
          style={{ width: "100%" }}
          autoComplete="off"
        />
      </Grid>

      {/* Responsibilities */}
      <Grid size={12}>
        <Typography>
          What are the responsibilities? What evidence do you have to show you
          can take them on?
        </Typography>
        <TextareaAutosizeElement
          control={control}
          name="responsibilities"
          minRows={3}
          style={{ width: "100%" }}
          autoComplete="off"
        />
      </Grid>

      {/* Requirements */}
      <Grid size={12} mb={2}>
        <Typography>
          What other requirements are in the job description? How do you meet
          them?
        </Typography>
        <TextareaAutosizeElement
          control={control}
          name="requirements"
          minRows={3}
          style={{ width: "100%" }}
          autoComplete="off"
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="h3">Todo list</Typography>
      </Grid>

      {/* Dynamic Tasks */}
      <Grid size={12}>
        {fields.map((item, index) => (
          <Grid container key={item.id} spacing={1} alignItems="center" mb={2}>
            <Grid size={11 / 3}>
              <TextFieldElement
                name={`applicationTasks.${index}.taskName`}
                label="Task Name"
                control={control}
                required
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid size={11 / 3}>
              <SelectElement
                name={`applicationTasks.${index}.taskStatus`}
                label="Status"
                control={control}
                options={[
                  { id: "Not Started", label: "Not Started" },
                  { id: "In Progress", label: "In Progress" },
                  { id: "Done", label: "Done" },
                ]}
                fullWidth
              />
            </Grid>

            <Grid size={11 / 3}>
              <TextFieldElement
                name={`applicationTasks.${index}.documentUrl`}
                label="Document URL"
                control={control}
                fullWidth
              />
            </Grid>

            <Grid size={1} display="flex" alignItems="center">
              <Button
                variant="outlined"
                color="error"
                onClick={() => remove(index)}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid size={12} mb={2}>
          <Button
            variant="contained"
            onClick={() =>
              append({
                taskName: "",
                taskStatus: "Not Started",
                documentUrl: null,
              })
            }
          >
            ADD TASK
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
