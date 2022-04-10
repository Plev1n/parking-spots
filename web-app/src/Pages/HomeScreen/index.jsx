import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TimeSlider from '../../Components/Inputs/TimeSlider';
import Location from '../../Components/Inputs/Location';
import DatePickerCustom from '../../Components/Inputs/DatePicker';
import Title from '../../Components/Title';
import Preferences from '../../Components/Inputs/Preferences';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const HomeScreen = props => {
  const [time, setTime] = React.useState(new Date());
  const [startLat, setStartLat] = React.useState('');
  const [finishLat, setFinishLat] = React.useState('');
  const [startLon, setStartLon] = React.useState('');
  const [finishLon, setFinishLon] = React.useState('');
  const [parkingTime, setParkingTime] = React.useState(3600);
  const [response, setResponse] = React.useState(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const timeISO = time.toISOString()
    console.log(timeISO, parkingTime, startLat, startLon, finishLat, finishLon)
    localStorage.setItem("parkingTime", parkingTime)
    localStorage.setItem("time", timeISO)
    localStorage.setItem("startLat", startLat)
    localStorage.setItem("startLon", startLon)
    localStorage.setItem("finishLon", finishLon)
    localStorage.setItem("finishLat", finishLat)
    axios.post('https://enigmatic-mountain-28502.herokuapp.com/get_parking_spot', {
      timeISO,
      startLat,
      startLon,
      finishLat,
      finishLon,
      parkingTime
    })
      .then(function (response) {
        setResponse(response)
        navigate("/results");
      })
      .catch(function (error) {
        console.log(error);
        navigate("/results");
      });
  }

  return (
    <div style={{ padding: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Stack spacing={2}>
        <Title />
        <Location setStartLat={setStartLat} setStartLon={setStartLon} setFinishLat={setFinishLat} setFinishLon={setFinishLon} />
        <DatePickerCustom setTime={setTime} time={time} />
        <TimeSlider setParkingTime={setParkingTime} parkingTime={parkingTime} />
        <Preferences />
        <Button onClick={handleSubmit} variant="contained">Hledat</Button>
      </Stack>
    </div>
  )
}