"use client";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/en-gb";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale("en-gb");

export function DateTimeSelector({
  name,
  control,
  label,
  fullWidth,
  required,
  showTime = true,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...restField }, fieldState }) => (
        <DateTimePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(val) => onChange(val ? val.toISOString() : null)}
          format={showTime ? "DD/MM/YYYY HH:mm" : "DD/MM/YYYY"}
          slotProps={{
            textField: {
              error: !!fieldState.error,
              helperText: fieldState.error ? fieldState.error.message : "",
              fullWidth,
              required,
              inputProps: { readOnly: true },
            },
          }}
          {...restField}
        />
      )}
    />
  );
}
