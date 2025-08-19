"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GoBackLink() {
  const router = useRouter();

  return (
    <Button startIcon={<KeyboardBackspace />} onClick={() => router.back()}>
      Go Back
    </Button>
  );
}
