import Link from "next/link";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function EditStageBtn({ href }) {
  return (
    <IconButton aria-label="edit stage" component={Link} href={href}>
      <Edit />
    </IconButton>
  );
}
