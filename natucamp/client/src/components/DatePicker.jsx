import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function Calendario({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Seleccione una fecha"
        value={value}
        onChange={onChange}
        format="YYYY-MM-DD"
        sx={{
          maxWidth: "300px",
          width: "100%",
          "& .MuiInputBase-root": {
            backgroundColor: "#f0e6e6",
            borderRadius: "5px",
            paddingRight: "10px", // Espacio para ícono
            alignItems: "center",
            overflow: "hidden", // 🔧 elimina scroll interno
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid maroon", // como tus otros inputs
          },
          "& .MuiInputBase-input": {
            padding: "15px 10px", // Centrado visual
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          },
          "& .MuiSvgIcon-root": {
            color: "maroon",
          },
        }}
      />
    </LocalizationProvider>
  );
}
