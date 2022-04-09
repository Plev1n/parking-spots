import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TimeSlider from '../../Components/TimeSlider';

export const HomePage = props => {
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [age, setAge] = React.useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{width: "400px", margin:"0 auto", padding: "100px"}}>
      <Stack spacing={2}>
        <p style={{height: "40px", margin: "0 auto", fontSize: "30px"}}>Parkuj výhodně - alfa</p>
        <TextField id="outlined-basic" label="Kam" variant="outlined" />
        <TextField id="outlined-basic" label="Kdy" variant="outlined" />
        <TimeSlider />
        <Select
          native
          value={age}
          onChange={handleChange}
          input={<OutlinedInput label="Age" id="demo-dialog-native" />}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
        <Button variant="outlined">Hledat</Button>
      </Stack>
    </div>
  )
}