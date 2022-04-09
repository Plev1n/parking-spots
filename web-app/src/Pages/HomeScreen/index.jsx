import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TimeSlider from '../../Components/Inputs/TimeSlider';
import Location from '../../Components/Inputs/Location';
import WhenInput from '../../Components/Inputs/WhenInput';
import Title from '../../Components/Title';
import Preferences from '../../Components/Inputs/Preferences';
import axios from 'axios';

export const HomeScreen = props => {
  const [time, setTime] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:5000/get_parking_spot', {
      time, 
      startLocation: location
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div style={{padding:"50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Stack spacing={2}>
        <Title />
        <Location setLocation={setLocation} />
        <WhenInput setTime={setTime}/>
        <TimeSlider />
        <Preferences />
        <Button onClick={handleSubmit} variant="outlined">Hledat</Button>
      </Stack>
    </div>
  )
}