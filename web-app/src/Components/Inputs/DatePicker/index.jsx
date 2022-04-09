import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import csLocale from "date-fns/locale/cs";

const DatePickerCustom = () => {
  const [date, setDate] = React.useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Kdy"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        disablePast
      />
    </LocalizationProvider>
  )
}

export default DatePickerCustom