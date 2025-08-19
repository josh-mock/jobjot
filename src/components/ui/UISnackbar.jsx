"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useContext } from "react";
import { UIContext } from "@/contexts/UI.context";

export default function UISnackbar() {
  const { snackbar } = useContext(UIContext);
  const { isArchived, message, severity, hideDuration, onClose } = snackbar;

  return (
    <Snackbar
      open={isArchived}
      autoHideDuration={hideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
