import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const TimeSlider = (props) => {
  let seconds = props.parkingTime

  const handleAddTime = () => {
    if (seconds > 35999) {
      props.setParkingTime(seconds += 3600)
      return
    }
    props.setParkingTime(seconds += 1800);
  }

  const handleRemoveTime = () => {
    if (seconds > 36999) {
      props.setParkingTime(seconds -= 3600)
      return
    }
    props.setParkingTime(seconds -= 1800);
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
    <div style={{ margin: "0 auto" }}>
      {/* <p style={{margin: 0, textAlign: "left", fontSize: "10px" }}>Doba parkování</p> */}
      <div style={{ display: 'flex', flexDirection: 'row', margin: "0 auto" }}>
        <IconButton disabled={seconds <= 0} onClick={handleRemoveTime}><ArrowBackIosNewIcon /></IconButton>
        <p style={{ fontSize: "25px" }}>{getHoursAndMinutes()}</p>
        <IconButton onClick={handleAddTime}><ArrowForwardIosIcon /></IconButton>
      </div>
    </div>
  )
}

export default TimeSlider