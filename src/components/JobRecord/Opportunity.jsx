import formatDate from "@/lib/utils/formatDate";
import { Link, Paper, Typography, Grid } from "@mui/material";
import EditStageBtn from "../ui/buttons/EditStageBtn";
import { paperSx } from "@/styles/globals";

export default function Opportunity({ opportunityData, isArchived, jobId }) {
  return (
    <Paper sx={paperSx}>
      <Typography variant="h3" textAlign={"center"} mb={2}>
        Opportunity details
      </Typography>

      <Grid container spacing={1}>
        <Grid size={6}>
          <Typography>
            {opportunityData.jobAdUrl ? (
              <Link
                href={opportunityData.jobAdUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link to job advert
              </Link>
            ) : (
              "Link to job advert:"
            )}
          </Typography>
        </Grid>

        <Grid size={6}>
          <Typography>Location: {opportunityData.location}</Typography>
        </Grid>

        <Grid size={6}>
          <Typography>Salary: {opportunityData.salary}</Typography>
        </Grid>

        <Grid size={6} mb={5}>
          <Typography>
            Application deadline:{" "}
            {formatDate(
              opportunityData.applicationDeadline,
              "DD MMMM YYYY HH:MM"
            )}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography fontWeight={"bold"}>Relevant experience</Typography>
          <Typography>{opportunityData.matchingExperiences}</Typography>
        </Grid>

        <Grid size={12}>
          <Typography fontWeight={"bold"}>Relevant skills</Typography>
          <Typography>{opportunityData.matchingSkills}</Typography>
        </Grid>

        <Grid size={12}>
          <Typography fontWeight={"bold"}>
            What I like about the role
          </Typography>
          <Typography> {opportunityData.roleLikes}</Typography>
        </Grid>

        <Grid size={12}>
          <Typography fontWeight={"bold"}>Things I'm unsure about</Typography>
          <Typography> {opportunityData.roleUnsure}</Typography>
        </Grid>

        {!isArchived && <EditStageBtn href={`/jobs/${jobId}/edit`} />}
      </Grid>
    </Paper>
  );
}
