"use client";
import Application from "@/components/JobRecord/Application";
import Interviews from "@/components/JobRecord/Interviews";
import JobRecordLinks from "@/components/JobRecord/JobRecordLinks";
import Offer from "@/components/JobRecord/Offer";
import Opportunity from "@/components/JobRecord/Opportunity";
import Archive from "@/components/JobRecord/Archive";
import { Typography, Container, Box, Stack } from "@mui/material";

export default function JobRecord({ isArchived, job, jobId }) {
  const { archive, offer, interviews, application, ...opportunity } = job;
  console.log("Job object:", job);
  console.log("Archive field:", archive);
  if (archive) {
    console.log("archive._id:", archive._id, "jobId:", jobId);
  }

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ textAlign: "center" }}
      >{`${job.jobTitle} at ${job.company}`}</Typography>

      <Box display={"flex"} justifyContent={"center"} mb={2}>
        <JobRecordLinks job={job} jobId={jobId} isArchived={isArchived} />
      </Box>

      <Stack spacing={5} mb={2}>
        {/* ARCHIVE */}
        {isArchived && <Archive archiveData={archive} jobId={jobId} />}
        {/* OPPORTUNITY */}
        <Opportunity
          opportunityData={opportunity}
          jobId={jobId}
          isArchived={isArchived}
        />
        {/* APPLICATION */}
        {application && (
          <Application
            applicationData={application}
            isArchived={isArchived}
            jobId={jobId}
          />
        )}
        {/* INTERVIEWS */}
        {interviews.length > 0 && (
          <Interviews
            interviews={interviews}
            jobId={jobId}
            isArchived={isArchived}
          />
        )}
        {/* OFFER */}
        {job.offer && (
          <Offer offerData={job.offer} jobId={jobId} isArchived={isArchived} />
        )}
      </Stack>
    </Container>
  );
}
