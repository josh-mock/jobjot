import formatDate from "@/lib/utils/formatDate";
import { Box, Paper, Typography } from "@mui/material";
import EditStageBtn from "../ui/buttons/EditStageBtn";
import { paperSx } from "@/styles/globals";

export default function Archive({ jobId, archiveData }) {
  console.log(archiveData._id, jobId);
  return (
    <Paper sx={paperSx}>
      <Typography variant="h3" textAlign={"center"} mb={2}>
        Opportunity Closed
      </Typography>

      <Typography>Date closed: {formatDate(archiveData.dateClosed)}</Typography>

      <Typography mb={1}>
        Reason for closing: {archiveData.reasonForClosing}
      </Typography>

      <Box mb={1}>
        <Typography fontWeight={"bold"}>Feedback Received</Typography>
        <Typography>{archiveData.feedbackReceived}</Typography>
      </Box>

      <Box mb={1}>
        <Typography fontWeight={"bold"}>Reflection</Typography>
        <Typography>{archiveData.reflection}</Typography>
      </Box>

      <EditStageBtn href={`/jobs/${jobId}/archive/${archiveData._id}/edit`} />
    </Paper>
  );
}
