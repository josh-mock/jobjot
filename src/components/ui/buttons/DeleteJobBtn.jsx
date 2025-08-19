"use client";
import { useJobs } from "@/hooks/useJobs.hook";
import { Delete } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";

export default function DeleteJobBtn({
  jobId,
  isIconBtn,
  isIconTextBtn = false,
  icon = <Delete />,
  label = "Delete Opportunity",
  redirectTo = "/",
}) {
  const { deleteJobMutation } = useJobs();

  const handleDelete = () => {
    deleteJobMutation.mutate({ jobId, redirectTo });
  };

  return isIconBtn ? (
    <IconButton aria-label="Delete job opportunity" onClick={handleDelete}>
      {icon}
    </IconButton>
  ) : (
    <Button onClick={handleDelete} startIcon={isIconTextBtn ? icon : null}>
      {label}
    </Button>
  );
}
