"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useUI from "@/hooks/useUI.hook";
import { useRouter } from "next/navigation";

export function useJobs() {
  const router = useRouter();

  const {
    snackbar: { showErrorMessage, showSuccessMessage },
  } = useUI();
  const queryClient = useQueryClient();

  // Fetch jobs
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      return res.json();
    },
    staleTime: Infinity,
  });

  // Create job
  const createJobMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.status !== 201) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData;
      }
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: "Opportunity created successfully!" });
      router.push(`/jobs/${data.jobId}`);
    },
    onError: (err) => {
      showErrorMessage({
        message: `Could not save:\n\n${
          err.details?.join("\n") || err.error || err.message || "Unknown error"
        }`,
      });
    },
  });
  // Fetch job by ID
  const getJobById = (jobId) => {
    return jobsQuery.data.find((j) => j._id === jobId);
  };

  // Fetch jobs by stage
  const getArchivedJobs = () => {
    return jobsQuery.data.filter((job) => job.stage === "archive");
  };

  // Update job (opportunity)
  const updateJobMutation = useMutation({
    mutationFn: async ({ jobId, formData }) => {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formData),
      });
      if (res.status !== 200) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData;
      }
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: "Opportunity updated successfully!" });
      router.push(`/jobs/${data.jobId}`);
    },
    onError: (err) => {
      showErrorMessage({
        message: `Could not save:\n\n${
          err.details?.join("\n") || err.error || err.message || "Unknown error"
        }`,
      });
    },
  });

  // Delete job
  const deleteJobMutation = useMutation({
    mutationFn: async ({ jobId, redirectTo = "/" }) => {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      return redirectTo; // will always return a string
    },
    onSuccess: (redirectTo) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: "Job deleted!" });
      router.push(redirectTo);
    },
    onError: (err) => {
      showErrorMessage({ message: `Could not delete: ${err.message}` });
    },
  });

  // DELETE ALL JOBS
  const deleteJobsMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/jobs", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete jobs");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: "All opportunities deleted!" });
    },
    onError: (err) => {
      showErrorMessage({ message: `Could not reset: ${err.message}` });
    },
  });

  const getStageById = ({ jobId, stageId, stage }) => {
    const job = getJobById(jobId);
    // Use the correct property for interviews
    const key = stage === "interview" ? "interviews" : stage;
    const stageData = job[key];
    if (Array.isArray(stageData))
      return stageData.find((s) => s._id === stageId);
    if (stageData?._id === stageId) return stageData;
    return null;
  };

  // CREATE STAGE
  const createStageMutation = useMutation({
    mutationFn: async ({ jobId, stage, formData }) => {
      const res = await fetch(`/api/jobs/${jobId}/${stage}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formData),
      });
      if (res.status !== 201) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData;
      }
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: data.message });
      router.push(`/jobs/${data.jobId}`);
    },
    onError: (err) => {
      showErrorMessage({
        message: `Could not save:\n\n${
          err.details?.join("\n") || err.error || err.message || "Unknown error"
        }`,
      });
    },
  });

  // UPDATE STAGE
  const updateStageMutation = useMutation({
    mutationFn: async ({ stageId, stage, formData, jobId }) => {
      const res = await fetch(`/api/jobs/${jobId}/${stage}/${stageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formData),
      });
      if (res.status !== 200) {
        const errorData = await res.json().catch(() => ({}));
        throw errorData;
      }
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: data.message });
      router.push(`/jobs/${data.jobId}`);
    },
    onError: (err) => {
      showErrorMessage({
        message: `Could not save:\n\n${
          err.details?.join("\n") || err.error || err.message || "Unknown error"
        }`,
      });
    },
  });

  // Delete stage
  const deleteStageMutation = useMutation({
    mutationFn: async ({ stageId, stage, jobId }) => {
      const res = await fetch(`/api/jobs/${jobId}/${stage}/${stageId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete stage");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      showSuccessMessage({ message: data.message });
    },
    onError: (err) => {
      showErrorMessage({ message: `Could not delete: ${err.message}` });
    },
  });

  return {
    jobsQuery,
    createJobMutation,
    getJobById,
    getArchivedJobs,
    updateJobMutation,
    deleteJobMutation,
    deleteJobsMutation,

    createStageMutation,
    getStageById,
    updateStageMutation,
    deleteStageMutation,
  };
}
