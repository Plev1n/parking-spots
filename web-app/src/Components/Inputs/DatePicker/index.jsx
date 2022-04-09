import React from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import csLocale from "date-fns/locale/cs";

const DatePickerCustom = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Kdy"
        value={props.time}
        onChange={(newValue) => {
          props.setTime(newValue);
        }}
        disablePast
      />
    </LocalizationProvider>
  )
}

export default DatePickerCustom