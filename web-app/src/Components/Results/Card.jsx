import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Button } from '@mui/material';

const Card = ({location, }) => {
  return (
    <div style={{ border: "1px solid #000" }}>
      <div>
        Z {location}
      </div>
      <DirectionsCarIcon />
      <Button>Začít</Button>
      <LocalParkingIcon />
      <Button>Začít</Button>
      <DirectionsRunIcon />
    </div>
  )
}

export default Card