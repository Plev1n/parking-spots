import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const TimeSlider = () => {
  let [seconds, setSeconds] = React.useState(5400)

  const handleAddTime = () => {
    setSeconds(seconds += 1800);
  }

  const handleRemoveTime = () => {
    setSeconds(seconds -= 1800);
  }

  const getHoursAndMinutes = () => {
    if (seconds > 0) {
      const hours = seconds / 3600
      const minutes = (seconds / 60) % 60
      return `${Math.trunc(hours)}h:${minutes}min`
    }
    return `${0}h:${0}min`
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 10, margin: "0 auto" }}>
      {/* <p>Doba parkování</p> */}
      <IconButton onClick={handleRemoveTime}><ArrowBackIosNewIcon /></IconButton>
      <p style={{ fontSize: "25px" }}>{getHoursAndMinutes()}</p>
      <IconButton onClick={handleAddTime}><ArrowForwardIosIcon /></IconButton>
    </div>
  )
}

export default TimeSlider