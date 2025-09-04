"use client";
import KanbanCard from "@/app/(home)/Kanban/KanbanCard";
import Loading from "@/components/ui/Loading";
import { useJobs } from "@/hooks/useJobs.hook";
import { Grid, Paper, Stack, Typography } from "@mui/material";

const stages = [
  { key: "opportunity", label: "Opportunities" },
  { key: "application", label: "Applications" },
  { key: "interview", label: "Interviews" },
  { key: "offer", label: "Offers" },
];

export default function KanbanBoard() {
  const { jobsQuery } = useJobs();

  if (jobsQuery.isLoading) return <Loading />;
  if (jobsQuery.isError) return <div>Error: {jobsQuery.error.message}</div>;

  const jobs = jobsQuery.data || [];

  return (
    <Grid container spacing={2} mb={2}>
      {stages.map((stage, i) => {
        const jobsInStage = jobs.filter(
          (job) => job.stage === stage.key && job.stage !== "archive"
        );

        return (
          <Grid size={3} key={i}>
            <Paper sx={{ height: "525px", p: 2 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ textAlign: "center", mb: 2 }}
              >
                {stage.label}
              </Typography>

              {jobsInStage.length === 0 ? (
                <Typography textAlign="center">No jobs</Typography>
              ) : (
                <Stack spacing={2}>
                  {jobsInStage.map((job, index) => (
                    <KanbanCard key={job.id || index} job={job} />
                  ))}
                </Stack>
              )}
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
