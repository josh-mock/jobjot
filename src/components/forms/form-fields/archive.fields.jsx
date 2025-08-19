"use client";
import { DateTimeSelector } from "@/components/forms/Form/inputs/DateTimeSelector";
import { Typography, Box } from "@mui/material";
import { TextareaAutosizeElement } from "react-hook-form-mui";

export function ArchiveFormFields({ control }) {
  return (
    <Box display={"flex"} gap={2} flexDirection={"column"}>
      {/* Date Closed */}
      <DateTimeSelector
        control={control}
        fullWidth
        name="dateClosed"
        label="Date closed"
        showTime={false}
        required
      />

      {/* Reason for closing */}
      <TextareaAutosizeElement
        control={control}
        fullWidth
        name="reasonForClosing"
        label="Reason for closing"
        required
        autoComplete="off"
      />

      {/* Feedback */}
      <TextareaAutosizeElement
        control={control}
        fullWidth
        name="feedbackReceived"
        label="Feedback received"
        autoComplete="off"
      />

      {/* Reflection */}
      <Box>
        <Typography>What have you learned from this process?</Typography>
        <TextareaAutosizeElement
          control={control}
          fullWidth
          name="reflection"
          autoComplete="off"
        />
      </Box>
    </Box>
  );
}
