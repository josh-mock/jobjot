import { Inventory } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function ArchiveLink() {
  return (
    <Button startIcon={<Inventory />} href={"/jobs/archive"} component={Link}>
      Archived Opportunities
    </Button>
  );
}
