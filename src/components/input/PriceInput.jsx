import { TextField, InputAdornment } from "@mui/material";

const PriceInput = ({ label, value, onChange }) => {
  return (
    <TextField
      sx={{ width: "12rem" }}
      label={label}
      type="number"
      value={value}
      onChange={onChange}
      slotProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      fullWidth
    />
  );
};

export default PriceInput;
