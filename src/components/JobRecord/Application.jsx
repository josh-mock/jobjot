"use client";
import DeleteStageBtn from "@/components/ui/buttons/DeleteStageBtn";
import EditStageBtn from "../ui/buttons/EditStageBtn";
import {
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { paperSx } from "@/styles/globals";

export default function Application({ applicationData, jobId, isArchived }) {
  const stageId = applicationData._id;
  return (
    <Paper sx={paperSx}>
      <Typography variant="h3" textAlign={"center"} mb={2}>
        Application
      </Typography>

      <Box mb={1}>
        <Typography fontWeight={"bold"}>
          Key skills asked for in the job description
        </Typography>
        <Typography>{applicationData.keySkills}</Typography>
      </Box>

      <Box mb={1}>
        <Typography fontWeight={"bold"}>
          Key responsibilities set out in the job description
        </Typography>
        <Typography>{applicationData.responsibilities}</Typography>
      </Box>

      <Box mb={1}>
        <Typography fontWeight={"bold"}>
          Other requirements in the job description
        </Typography>
        <Typography>{applicationData.requirements}</Typography>
      </Box>

      {/* APPLICATION TASKS */}
      <Typography variant="h4">Application tasks</Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Link to file</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationData.applicationTasks.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.taskName}
                </TableCell>
                <TableCell>{row.taskStatus}</TableCell>
                <TableCell>
                  {row.documentUrl ? (
                    <MuiLink href={row.documentUrl}>File</MuiLink>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!isArchived && (
        <>
          <EditStageBtn href={`/jobs/${jobId}/application/${stageId}/edit`} />
          <DeleteStageBtn
            jobId={jobId}
            stage={"application"}
            stageId={stageId}
          />
        </>
      )}
    </Paper>
  );
}
