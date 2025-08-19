"use client";
import { DateTimeSelector } from "@/components/forms/Form/inputs/DateTimeSelector";
import { Typography, Grid } from "@mui/material";
import { TextFieldElement, TextareaAutosizeElement } from "react-hook-form-mui";
export function JobFormFields({ control }) {
  return (
    <Grid container spacing={2}>
      {/* Job Title */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="jobTitle"
          label="Job Title"
          required
          autoComplete="off"
        />
      </Grid>

      {/* Salary */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="salary"
          label="Salary"
          autoComplete="off"
        />
      </Grid>

      {/* Company */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="company"
          label="Company"
          required
          autoComplete="off"
        />
      </Grid>

      {/* Location */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="location"
          label="Location"
          autoComplete="off"
        />
      </Grid>

      {/* Job Ad URL */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="jobAdUrl"
          label="Link to job advert"
          autoComplete="off"
        />
      </Grid>

      {/* Application Deadline */}
      <Grid size={4}>
        <DateTimeSelector
          control={control}
          fullWidth
          name="applicationDeadline"
          label="Application deadline"
        />
      </Grid>

      {/* Role Likes */}
      <Grid size={12}>
        <Typography>What do you like about the role?</Typography>
        <TextareaAutosizeElement
          control={control}
          fullWidth
          name="roleLikes"
          autoComplete="off"
        />
      </Grid>

      {/* Role Unsure */}
      <Grid size={12}>
        <Typography>What are you not sure about?</Typography>
        <TextareaAutosizeElement
          control={control}
          fullWidth
          name="roleUnsure"
          autoComplete="off"
        />
      </Grid>

      {/* Matching Skills */}
      <Grid size={12}>
        <Typography>
          What skills do you have which match the job description?
        </Typography>
        <TextareaAutosizeElement
          control={control}
          fullWidth
          name="matchingSkills"
          autoComplete="off"
        />
      </Grid>

      {/* Matching Experiences */}
      <Grid size={12}>
        <Typography>
          What experience do you have which match the job description?
        </Typography>
        <TextareaAutosizeElement
          control={control}
          fullWidth
          name="matchingExperiences"
          autoComplete="off"
        />
      </Grid>
    </Grid>
  );
}
