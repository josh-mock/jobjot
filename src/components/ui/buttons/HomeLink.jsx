import { Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function HomeLink() {
  return (
    <Button component={Link} startIcon={<Home />} href={"/"}>
      Home
    </Button>
  );
}
