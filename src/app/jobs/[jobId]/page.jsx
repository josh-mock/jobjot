"use client";
import JobRecord from "@/components/JobRecord";
import Loading from "@/components/ui/Loading";
import { useJobs } from "@/hooks/useJobs.hook";
import { useParams } from "next/navigation";

export default function page() {
  const { jobsQuery, getJobById } = useJobs();
  const { jobId } = useParams();

  // FETCH JOB
  if (jobsQuery.isLoading) return <Loading />;
  const job = getJobById(jobId);
  if (!job) return <div>Job not found.</div>;

  const isArchived = Boolean(job.archive);

  return <JobRecord isArchived={isArchived} job={job} jobId={jobId} />;
}
