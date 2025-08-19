"use client";
import { DateTimeSelector } from "@/components/forms/Form/inputs/DateTimeSelector";
import { TextFieldElement, TextareaAutosizeElement } from "react-hook-form-mui";
import { Grid } from "@mui/material";
export function OfferFormFields({ control }) {
  return (
    <Grid container spacing={2}>
      {/* Salary */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="salaryOffered"
          label="Salary"
          required
          autoComplete="off"
        />
      </Grid>

      {/* Annual Leave */}
      <Grid size={4}>
        <TextFieldElement
          control={control}
          fullWidth
          name="annualLeave"
          label="Annual leave"
          autoComplete="off"
          required
        />
      </Grid>

      {/* Response Deadline */}
      <Grid size={4}>
        <DateTimeSelector
          control={control}
          fullWidth
          name="responseDeadline"
          label="Response deadline"
        />
      </Grid>

      {/* Benefits */}
      <TextareaAutosizeElement
        control={control}
        fullWidth
        name="benefits"
        label="Benefits"
        autoComplete="off"
      />

      {/* Benefits */}
      <TextareaAutosizeElement
        control={control}
        fullWidth
        name="notes"
        label="Notes"
        autoComplete="off"
      />
    </Grid>
  );
}
