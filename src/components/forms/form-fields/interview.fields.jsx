"use client";
import { Button, Typography, Grid } from "@mui/material";
import { useFieldArray, useWatch } from "react-hook-form";
import {
  SelectElement,
  TextareaAutosizeElement,
  TextFieldElement,
  CheckboxElement,
} from "react-hook-form-mui";
import { DateTimeSelector } from "@/components/forms/Form/inputs/DateTimeSelector";

export function InterviewFormFields({ control }) {
  const interviewComplete = useWatch({
    control,
    name: "interviewComplete",
  });

  const {
    fields: interviewTaskFields,
    append: appendTask,
    remove: removeTask,
  } = useFieldArray({ control, name: "interviewTasks" });

  const {
    fields: interviewerFields,
    append: appendInterviewer,
    remove: removeInterviewer,
  } = useFieldArray({ control, name: "interviewers" });

  return (
    <Grid container spacing={2}>
      {/* Basic Fields */}
      <Grid size={6}>
        <DateTimeSelector
          label="Interview date"
          name="interviewDate"
          control={control}
          fullWidth
          required
        />
      </Grid>
      <Grid size={6}>
        <TextFieldElement
          name="contact"
          label="Point of contact"
          control={control}
          fullWidth
          autoComplete="off"
        />
      </Grid>
      <Grid size={6}>
        <TextFieldElement
          name="dressCode"
          label="Dress code"
          control={control}
          fullWidth
          autoComplete="off"
        />
      </Grid>
      <Grid size={6}>
        <TextFieldElement
          name="location"
          label="Location"
          control={control}
          fullWidth
          autoComplete="off"
          required
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="h3">Interviewers</Typography>
      </Grid>

      <Grid size={12}>
        {/* Interviewers */}
        {interviewerFields.map((item, index) => (
          <Grid container spacing={1} key={item.id} alignItems="center" mb={2}>
            <Grid size={11 / 3}>
              <TextFieldElement
                name={`interviewers.${index}.interviewerName`}
                label="Name"
                control={control}
                fullWidth
                autoComplete="off"
                required
              />
            </Grid>

            <Grid size={11 / 3}>
              <TextFieldElement
                name={`interviewers.${index}.interviewerPosition`}
                label="Position"
                control={control}
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid size={11 / 3}>
              <TextFieldElement
                name={`interviewers.${index}.linkedInUrl`}
                label="LinkedIn"
                control={control}
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid size={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeInterviewer(index)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid size={12} mb={2}>
          <Button
            variant="contained"
            onClick={() =>
              appendInterviewer({ interviewerName: "", linkedInUrl: "" })
            }
          >
            Add Interviewer
          </Button>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Typography variant="h3">Todo</Typography>
      </Grid>

      <Grid size={12}>
        {/* Tasks */}
        {interviewTaskFields.map((item, index) => (
          <Grid container spacing={1} key={item.id} alignItems="center" mb={2}>
            <Grid size={11 / 3}>
              <TextFieldElement
                name={`interviewTasks.${index}.taskName`}
                label="Task"
                control={control}
                fullWidth
                autoComplete="off"
                required
              />
            </Grid>
            <Grid size={11 / 3}>
              <SelectElement
                name={`interviewTasks.${index}.taskStatus`}
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
                name={`interviewTasks.${index}.url`}
                label="Document URL"
                control={control}
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid size={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeTask(index)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid size={12} mb={2}>
          <Button
            variant="contained"
            onClick={() =>
              appendTask({ taskName: "", taskStatus: "Not Started", url: "" })
            }
          >
            Add Task
          </Button>
        </Grid>
      </Grid>

      {/* Potential Questions */}
      <Grid size={12}>
        <Typography>
          What might they ask you and how will you respond?
        </Typography>
        <TextareaAutosizeElement
          name="potentialQuestions"
          control={control}
          fullWidth
          autoComplete="off"
        />
      </Grid>

      {/* Questions to Ask */}
      <Grid size={12}>
        <Typography>What questions do you have for the panel?</Typography>
        <TextareaAutosizeElement
          name="questionsToAsk"
          control={control}
          fullWidth
          autoComplete="off"
        />
      </Grid>

      {/* Interview Complete */}
      <Grid size={12}>
        <CheckboxElement
          name="interviewComplete"
          label="Interview Complete?"
          control={control}
        />
      </Grid>

      {/* Conditional Fields */}
      {interviewComplete && (
        <>
          <Grid size={12}>
            <Typography>What went well?</Typography>
            <TextareaAutosizeElement
              name="whatWentWell"
              control={control}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid size={12}>
            <Typography>What could you improve for next time?</Typography>
            <TextareaAutosizeElement
              name="couldDoBetter"
              control={control}
              fullWidth
              autoComplete="off"
            />
          </Grid>
          <Grid size={12}>
            <Typography>Notes</Typography>
            <TextareaAutosizeElement
              name="notes"
              control={control}
              fullWidth
              autoComplete="off"
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
