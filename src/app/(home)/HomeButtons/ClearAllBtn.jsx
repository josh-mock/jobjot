"use client";
import { useJobs } from "@/hooks/useJobs.hook";
import { RestartAlt } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ClearAllBtn() {
  const { deleteJobsMutation } = useJobs();
  return (
    <Button
      startIcon={<RestartAlt />}
      onClick={() => {
        deleteJobsMutation.mutate();
      }}
    >
      Clear all opportunities
    </Button>
  );
}
