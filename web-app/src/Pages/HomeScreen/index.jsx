import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TimeSlider from '../../Components/Inputs/TimeSlider';
import WhereInput from '../../Components/Inputs/WhereInput';
import WhenInput from '../../Components/Inputs/WhenInput';
import Title from '../../Components/Title';
import Preferences from '../../Components/Inputs/Preferences';

export const HomeScreen = props => {
  const [time, setTime] = React.useState('');
  const [location, setLocation] = React.useState('');

  const handleSubmit = () => {
    if (time === '' || location === '') return

    console.log(time, location)
  }

  return (
    <div style={{padding:"50px", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Stack spacing={2}>
        <Title />
        <WhereInput setLocation={setLocation} />
        <WhenInput setTime={setTime}/>
        <TimeSlider />
        <Preferences />
        <Button onClick={handleSubmit} variant="outlined">Hledat</Button>
      </Stack>
    </div>
  )
}