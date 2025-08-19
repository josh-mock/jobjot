"use client";
import { useJobs } from "@/hooks/useJobs.hook";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function DeleteStageBtn({ jobId, stageId, stage }) {
  const { deleteStageMutation } = useJobs();
  return (
    <IconButton
      onClick={() => deleteStageMutation.mutate({ stageId, stage, jobId })}
    >
      <Delete />
    </IconButton>
  );
}
