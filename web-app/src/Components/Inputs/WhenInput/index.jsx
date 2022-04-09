import React from 'react'
import TextField from '@mui/material/TextField';
import DatePickerCustom from '../DatePicker';

const WhenInput = (props) => {
  const [isDateShown, showDate] = React.useState(false)
  const handleChange = (event) => {
    props.setTime(event.target.value)
    event.preventDefault()
  }

  const handleClick = () => {
    showDate(!isDateShown)
  }

  return <DatePickerCustom />
}

export default WhenInput