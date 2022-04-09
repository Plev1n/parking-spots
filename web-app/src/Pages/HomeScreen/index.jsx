import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TimeSlider from '../../Components/Inputs/TimeSlider';
import Location from '../../Components/Inputs/Location';
import DatePickerCustom from '../../Components/Inputs/DatePicker';
import Title from '../../Components/Title';
import Preferences from '../../Components/Inputs/Preferences';
import axios from 'axios';

export const HomeScreen = props => {
  const [time, setTime] = React.useState(new Date());
  const [location, setLocation] = React.useState('');
  const [parkingTime, setParkingTime] = React.useState(3600);

  const handleSubmit = () => {
    if (location === '') return
    console.log(time, location, parkingTime)
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
        <DatePickerCustom setTime={setTime} time={time}/>
        <TimeSlider setParkingTime={setParkingTime} parkingTime={parkingTime}/>
        {/* <Preferences /> */}
        <Button onClick={handleSubmit} variant="contained">Hledat</Button>
      </Stack>
    </div>
  )
}