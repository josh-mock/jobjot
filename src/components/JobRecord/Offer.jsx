import formatDate from "@/lib/utils/formatDate";
import { Box, Paper, Stack, Typography } from "@mui/material";
import DeleteStageBtn from "../ui/buttons/DeleteStageBtn";
import EditStageBtn from "../ui/buttons/EditStageBtn";
import { paperSx } from "@/styles/globals";

export default function Offer({ offerData, isArchived, jobId }) {
  return (
    <Paper sx={paperSx}>
      <Typography variant="h3" textAlign={"center"} mb={2}>
        Offer
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography>Salary: {offerData.salaryOffered}</Typography>
        <Typography>Annual leave: {offerData.annualLeave}</Typography>
        <Typography>
          Response deadline:{" "}
          {formatDate(offerData.responseDeadline, "DD MMMM YYYY HH:MM")}
        </Typography>
      </Box>

      <Stack>
        <Typography fontWeight={"bold"}>Benefits</Typography>
        <Typography>{offerData.benefits}</Typography>
      </Stack>

      <Stack>
        <Typography fontWeight={"bold"}>Notes</Typography>
        <Typography>{offerData.notes}</Typography>
      </Stack>

      {!isArchived && (
        <>
          <EditStageBtn href={`/jobs/${jobId}/offer/${offerData._id}/edit`} />
          <DeleteStageBtn
            jobId={jobId}
            stage={"offer"}
            stageId={offerData._id}
          />
        </>
      )}
    </Paper>
  );
}
