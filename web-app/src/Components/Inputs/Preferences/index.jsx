import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Preferences = () => {
  return (
    <div>
      <FormControlLabel control={<Checkbox />} label="Invalida" />
      <FormControlLabel control={<Checkbox />} label="Kočárek" />
      <FormControlLabel control={<Checkbox />} label="Nabíječka" />
    </div>
  )
}

export default Preferences