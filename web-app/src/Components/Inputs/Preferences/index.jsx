import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AccessibleIcon from '@mui/icons-material/Accessible';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Preferences = (props) => {
  return (
    <div style={{display: "flex", flexDirection: "column", margin: "0px"}}>
      <FormControlLabel onChange={props.setInvalidity(!props.invalidity)} value={props.invalidity} control={<Checkbox />} label="Osoba se sníženou mobilitou" />
      <FormControlLabel control={<Checkbox />} label="Nabíječka elektromobilů" />
      <FormControlLabel control={<Checkbox />} label="MPV, VAN, SUV do výšky 2,1m" />
      <FormControlLabel control={<Checkbox />} label="Opatrný řidič" />
    </div>
  )
}

export default Preferences