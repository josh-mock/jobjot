"use client";
import Form from "@/components/forms/Form";
import { JobFormFields } from "@/components/forms/form-fields/job.fields";
import { jobSchema } from "@/components/forms/schemas/job.schema";
import GoBackLink from "@/components/ui/buttons/GoBackLink";
import HomeLink from "@/components/ui/buttons/HomeLink";
import Loading from "@/components/ui/Loading";
import { useJobs } from "@/hooks/useJobs.hook";
import { paperSx } from "@/styles/globals";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function page() {
  const { jobId } = useParams();
  const { jobsQuery, getJobById, updateJobMutation } = useJobs();

  // FETCH JOB
  if (jobsQuery.isLoading) return <Loading />;
  const jobData = getJobById(jobId);

  const submitHandler = (formData) => {
    updateJobMutation.mutate({
      formData,
      jobId,
    });
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <HomeLink />
        <GoBackLink />
      </Box>

      <Paper sx={paperSx}>
        <Typography variant="h2" textAlign={"center"} mb={4}>
          Edit Opportunity
        </Typography>
        <Form
          formDefaultValues={jobData}
          schema={jobSchema}
          FormFields={JobFormFields}
          submitHandler={submitHandler}
          isEdit={true}
        />
      </Paper>
    </Container>
  );
}
