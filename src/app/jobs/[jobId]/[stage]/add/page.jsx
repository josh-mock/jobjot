"use client";
import { applicationDefaultValues } from "@/components/forms/defaults/application.defaults";
import { archiveDefaultValues } from "@/components/forms/defaults/archive.defaults";
import { interviewDefaultValues } from "@/components/forms/defaults/interview.defaults";
import { offerDefaultValues } from "@/components/forms/defaults/offer.defaults";
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
import { useJobs } from "@/hooks/useJobs.hook";
import { paperSx } from "@/styles/globals";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function page() {
  const { jobId, stage } = useParams();
  const { createStageMutation } = useJobs();

  const submitHandler = (formData) => {
    createStageMutation.mutate({
      jobId: jobId,
      stage: stage,
      formData: formData,
    });
  };

  const configs = {
    application: {
      formTitle: "Add Application",
      defaultValues: applicationDefaultValues,
      schema: applicationSchema,
      FormFields: ApplicationFormFields,
    },
    interview: {
      formTitle: "Add Interview",
      defaultValues: interviewDefaultValues,
      schema: interviewSchema,
      FormFields: InterviewFormFields,
    },
    offer: {
      formTitle: "Add Offer",
      defaultValues: offerDefaultValues,
      schema: offerSchema,
      FormFields: OfferFormFields,
    },
    archive: {
      formTitle: "Close Opportunity",
      defaultValues: archiveDefaultValues,
      schema: archiveSchema,
      FormFields: ArchiveFormFields,
    },
  };

  const config = configs[stage];
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <HomeLink />
        <GoBackLink />
      </Box>

      <Paper sx={paperSx}>
        <Typography variant="h2" textAlign={"center"} mb={4}>
          {config.formTitle}
        </Typography>

        <Form
          formDefaultValues={config.defaultValues}
          schema={config.schema}
          FormFields={config.FormFields}
          submitHandler={submitHandler}
        />
      </Paper>
    </Container>
  );
}
