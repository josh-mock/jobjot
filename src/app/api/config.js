import { applicationSchema } from "@/components/forms/schemas/application.schema";
import { Application } from "@/components/forms/models/application.model";
import { interviewSchema } from "@/components/forms/schemas/interview.schema";
import { Interview } from "@/components/forms/models/interview.model";
import { offerSchema } from "@/components/forms/schemas/offer.schema";
import { Offer } from "@/components/forms/models/offer.model";
import { archiveSchema } from "@/components/forms/schemas/archive.schema";
import { Archive } from "@/components/forms/models/archive.model";

export const config = {
  application: {
    schema: applicationSchema,
    model: Application,
    addSuccessMessage: "Application added successfully!",
    updateSuccessMessage: "Application updated successfully!",
    deleteSuccessMessage: "Application deleted",
  },
  interview: {
    schema: interviewSchema,
    model: Interview,
    addSuccessMessage: "Interview added successfully!",
    updateSuccessMessage: "Interview updated successfully!",
    deleteSuccessMessage: "Interview deleted",
  },
  offer: {
    schema: offerSchema,
    model: Offer,
    addSuccessMessage: "Offer added successfully!",
    updateSuccessMessage: "Offer updated successfully!",
    deleteSuccessMessage: "Offer deleted",
  },
  archive: {
    schema: archiveSchema,
    model: Archive,
    addSuccessMessage: "Job archived successfully!",
    updateSuccessMessage: "Reflection updated successfully!",
    deleteSuccessMessage: "Job re-opened successfully!",
  },
};
