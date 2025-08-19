import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function AddOpportunityLink() {
  return (
    <Button startIcon={<Add />} href={"/jobs/add"} component={Link}>
      Add Opportunity
    </Button>
  );
}
