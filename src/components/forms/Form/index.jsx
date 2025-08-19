"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, Box } from "@mui/material";
import { FormContainer, useForm } from "react-hook-form-mui";

export default function Form({
  formDefaultValues,
  schema,
  submitHandler,
  FormFields,
  isEdit,
}) {
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: formDefaultValues,
  });

  const handleFormSubmit = async (data) => {
    try {
      submitHandler(data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <FormContainer
      defaultValues={formDefaultValues}
      onSuccess={handleSubmit(handleFormSubmit)}
    >
      <Box mb={2}>
        <FormFields control={control} />
      </Box>

      <Box display={"flex"} justifyContent={"center"} mb={2}>
        <Stack direction={"row"} gap={2}>
          <Button
            type="reset"
            onClick={() => reset()}
            variant="outlined"
            disabled={!isDirty}
          >
            Reset
          </Button>
          <Button
            type="submit"
            primary="true"
            variant="contained"
            disabled={isSubmitting || !isValid || (!isEdit && !isDirty)}
          >
            {isEdit ? "Save" : "Submit"}
          </Button>
        </Stack>
      </Box>
    </FormContainer>
  );
}
