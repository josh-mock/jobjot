"use client";
import ArchiveLink from "@/components/ui/buttons/ArchiveLink";
import HomeLink from "@/components/ui/buttons/HomeLink";
import { useJobs } from "@/hooks/useJobs.hook";
import { Add, Close, Unarchive } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";
import DeleteJobBtn from "../ui/buttons/DeleteJobBtn";

export default function JobRecordLinks({ job, jobId, isArchived }) {
  const { deleteStageMutation } = useJobs();
  const redirectTo = isArchived ? "/jobs/archive" : "/";
  const buttons = [
    {
      stage: "application",
      label: "Add application",
      icon: <Add />,
      disabled: job.application,
    },
    {
      stage: "interview",
      label: "Add interview",
      icon: <Add />,
      disabled: job.offer,
    },
    {
      stage: "offer",
      label: "Add offer",
      icon: <Add />,
      disabled: job.offer,
    },
    {
      stage: "archive",
      label: "Close opportunity",
      icon: <Close />,
    },
  ];

  return (
    <>
      <HomeLink />
      {isArchived && (
        <>
          <ArchiveLink />
          <Button
            startIcon={<Unarchive />}
            onClick={() => {
              deleteStageMutation.mutate({
                stageId: job.archive._id,
                jobId,
                stage: "archive",
              });
            }}
          >
            Reopen opportunity
          </Button>
        </>
      )}

      {!isArchived &&
        buttons.map((button, index) => (
          <Button
            key={index}
            component={Link}
            href={`/jobs/${jobId}/${button.stage}/add`}
            disabled={button.disabled}
            startIcon={button.icon}
          >
            {button.label}
          </Button>
        ))}
      <DeleteJobBtn
        jobId={jobId}
        isIconTextBtn={true}
        redirectTo={redirectTo}
      />
    </>
  );
}
