import DeleteJobBtn from "@/components/ui/buttons/DeleteJobBtn";
import { Button, Card, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function KanbanCard({ job }) {
  return (
    <Card
      sx={{
        backgroundColor: "hsl(0, 0%, 98%)",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        component={"h3"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        {job.jobTitle}
      </Typography>
      <Stack direction={"column"} justifyContent={"center"}>
        <Typography variant="body1" textAlign={"center"}>
          {job.company}
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
          {job.location}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Button component={Link} href={`/jobs/${job._id}`}>
          View
        </Button>
        <Button component={Link} href={`/jobs/${job._id}/archive/add`}>
          Archive
        </Button>
        <DeleteJobBtn jobId={job._id} label="Delete" icon={null} />
      </Stack>
    </Card>
  );
}
