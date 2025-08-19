import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItemText,
  Link as MuiLink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import formatDate from "@/lib/utils/formatDate";
import EditStageBtn from "../ui/buttons/EditStageBtn";
import DeleteStageBtn from "../ui/buttons/DeleteStageBtn";
import { paperSx } from "@/styles/globals";

export default function Interviews({ interviews, jobId, isArchived }) {
  return (
    <Paper sx={paperSx}>
      <Typography variant="h3" textAlign={"center"} mb={2}>
        Interviews
      </Typography>
      {interviews.map((interview, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h4">{`Interview ${index + 1}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>
                Interview date:{" "}
                {formatDate(interview.interviewDate, "DD MMMM YYYY HH:MM")}
              </Typography>
              <Typography>Location: {interview.location}</Typography>
              <Typography>Dress code: {interview.dressCode}</Typography>
            </Box>

            <Typography variant="h5" mb={1}>
              Todo
            </Typography>
            <TableContainer sx={{ mb: 2 }}>
              <Table aria-label="task to do before the interivew">
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Link to file</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {interview.interviewTasks.map((row, index) => (
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

            <Typography variant="h5" mb={1}>
              Interviewers
            </Typography>
            <List>
              {interview.interviewers.map((interviewer, index) => (
                <ListItemText key={index}>
                  {interviewer.linkedInUrl ? (
                    <MuiLink
                      href={interviewer.linkedInUrl}
                    >{`${interviewer.interviewerName} (${interviewer.interviewerPosition})`}</MuiLink>
                  ) : (
                    `${interviewer.interviewerName} (${interviewer.interviewerPosition})`
                  )}
                </ListItemText>
              ))}
            </List>

            <Typography variant="h6">Questions</Typography>
            <Box mb={1}>
              <Typography fontWeight={"bold"}>Potential questions</Typography>
              <Typography>{interview.potentialQuestions}</Typography>
            </Box>

            <Box mb={1}>
              <Typography fontWeight={"bold"}>
                What questions do you have for the pannel?
              </Typography>
              <Typography>{interview.questionsToAsk}</Typography>
            </Box>

            {interview.interviewComplete && (
              <>
                <Typography variant="h6">Post-interview reflection</Typography>
                <Box mb={1}>
                  <Typography fontWeight={"bold"}>What went well</Typography>
                  <Typography>{interview.whatWentWell}</Typography>
                </Box>

                <Box mb={1}>
                  <Typography fontWeight={"bold"}>Things to improve</Typography>
                  <Typography>{interview.couldDoBetter}</Typography>
                </Box>

                <Box mb={1}>
                  <Typography fontWeight={"bold"}>Notes</Typography>
                  <Typography>{interview.notes}</Typography>
                </Box>
              </>
            )}
            {!isArchived && (
              <>
                <EditStageBtn
                  href={`/jobs/${jobId}/interview/${interview._id}/edit`}
                />
                <DeleteStageBtn
                  jobId={jobId}
                  stage={"interview"}
                  stageId={interview._id}
                />
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
}
