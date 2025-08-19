"use client";
import DeleteJobBtn from "@/components/ui/buttons/DeleteJobBtn";
import HomeLink from "@/components/ui/buttons/HomeLink";
import Loading from "@/components/ui/Loading";
import { useJobs } from "@/hooks/useJobs.hook";
import formatDate from "@/lib/utils/formatDate";
import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function page() {
  const { jobsQuery, getArchivedJobs, deleteStageMutation } = useJobs();

  if (jobsQuery.isLoading) return <Loading />;
  if (jobsQuery.isError) return <div>Error: {jobsQuery.error.message}</div>;

  const archivedJobs = getArchivedJobs();

  return (
    <Container>
      <Typography variant="h3" textAlign={"center"} mb={2}>
        Archive
      </Typography>

      <Box display={"flex"} justifyContent={"center"}>
        <HomeLink />
      </Box>

      <Grid container spacing={2}>
        {archivedJobs.length === 0 ? (
          <Grid size={12} my={2}>
            <Typography fontWeight={"bold"} textAlign={"center"}>
              No archived jobs
            </Typography>
          </Grid>
        ) : (
          archivedJobs.map((j, i) => (
            <Card key={i} sx={{ padding: 2 }}>
              <Typography variant="h5" component={"h3"} textAlign={"center"}>
                {j.jobTitle} at {j.company}
              </Typography>

              <Typography textAlign={"center"}>
                Closed on {formatDate(j.archive.dateClosed)}
              </Typography>

              <Box display={"flex"} justifyContent={"space-between"}>
                <Button key={i} href={`/jobs/${j._id}`} component={Link}>
                  VIEW
                </Button>

                <Button
                  onClick={() => {
                    deleteStageMutation.mutate({
                      stageId: j.archive._id,
                      jobId: j._id,
                      stage: "archive",
                    });
                  }}
                >
                  Unarchive
                </Button>

                <DeleteJobBtn
                  jobId={j._id}
                  redirectTo="/jobs/archive"
                  label="delete"
                />
              </Box>
            </Card>
          ))
        )}
      </Grid>
    </Container>
  );
}
