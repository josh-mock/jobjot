"use client";
import Form from "@/components/forms/Form";
import { ApplicationFormFields } from "@/components/forms/form-fields/application.fields";
import { ArchiveFormFields } from "@/components/forms/form-fields/archive.fields";
import { InterviewFormFields } from "@/components/forms/form-fields/interview.fields";
import { OfferFormFields } from "@/components/forms/form-fields/offer.fields";
import { applicationSchema } from "@/components/forms/schemas/application.schema";
import { archiveSchema } from "@/components/forms/schemas/archive.schema";
import { interviewSchema } from "@/components/forms/schemas/interview.schema";
import { offerSchema } from "@/components/forms/schemas/offer.schema";
import GoBackLink from "@/components/ui/buttons/GoBackLink";
import HomeLink from "@/components/ui/buttons/HomeLink";
import Loading from "@/components/ui/Loading";
import { useJobs } from "@/hooks/useJobs.hook";
import { paperSx } from "@/styles/globals";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function page() {
  const { jobId, stage, stageId } = useParams();
  const { jobsQuery, getStageById, updateStageMutation } = useJobs();

  // FETCH JOB
  if (jobsQuery.isLoading) return <Loading />;
  const stageData = getStageById({
    jobId,
    stageId,
    stage,
  });

  const submitHandler = (formData) => {
    updateStageMutation.mutate({
      stageId,
      stage,
      formData,
      jobId,
    });
  };

  const configs = {
    application: {
      formTitle: "Edit Application",
      schema: applicationSchema,
      FormFields: ApplicationFormFields,
    },
    interview: {
      formTitle: "Edit Interview",
      schema: interviewSchema,
      FormFields: InterviewFormFields,
    },
    offer: {
      formTitle: "Edit Offer",
      schema: offerSchema,
      FormFields: OfferFormFields,
    },
    archive: {
      formTitle: "Edit reflection",
      schema: archiveSchema,
      FormFields: ArchiveFormFields,
    },
  };

  const config = configs[stage];

  console.log(stageData);
  return (
    <Container>
      <Box display={"flex"} justifyContent={"center"}>
        <HomeLink />
        <GoBackLink />
      </Box>

      <Paper sx={paperSx}>
        <Typography variant="h2" textAlign={"center"} mb={4}>
          {config.formTitle}
        </Typography>
        <Form
          formDefaultValues={stageData}
          schema={config.schema}
          FormFields={config.FormFields}
          submitHandler={submitHandler}
          isEdit={true}
        />
      </Paper>
    </Container>
  );
}
