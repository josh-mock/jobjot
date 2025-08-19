"use client";
import { jobDefaultValues } from "@/components/forms/defaults/job.defaults";
import Form from "@/components/forms/Form";
import { JobFormFields } from "@/components/forms/form-fields/job.fields";
import { jobSchema } from "@/components/forms/schemas/job.schema";
import HomeLink from "@/components/ui/buttons/HomeLink";
import { useJobs } from "@/hooks/useJobs.hook";
import { paperSx } from "@/styles/globals";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function page() {
  const { createJobMutation } = useJobs();

  const submitHandler = (data) => {
    createJobMutation.mutate(data);
  };
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <HomeLink />
      </Box>

      <Paper sx={paperSx}>
        <Typography variant="h2" textAlign={"center"} mb={4}>
          Add Opportunity
        </Typography>

        <Form
          formDefaultValues={jobDefaultValues}
          schema={jobSchema}
          FormFields={JobFormFields}
          submitHandler={submitHandler}
        />
      </Paper>
    </Container>
  );
}
