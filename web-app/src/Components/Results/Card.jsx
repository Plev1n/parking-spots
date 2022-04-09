import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import CardOrg from '@mui/material/Card';

const Card = ({location, }) => {
  return (
    <CardOrg variant="outlined">
    {/* <div style={{ border: "1px solid #000", borderRadius: "4px", width: "500px", margin: "0 auto" }}> */}
      <div>
        {location} Parkoviště ulice whatever
      </div>
      <Divider />
      <div style={{display: "flex", flexDirection: "row", gap: "5px", margin: "0 auto", height: "50px"}}>
        <div>
          Volných míst 70 z 80
        </div>
        <div>
          Nehodovost 2/měsíc
        </div>
        <div>
          Přestupků 0/měsíc
        </div>
      </div>
      <DirectionsCarIcon fontSize="large" color="success"/>
      <Button color="info" variant="contained">Začít</Button>
      <LocalParkingIcon fontSize="large" color="primary"/>
      <Button color="info" variant="contained">Začít</Button>
      <DirectionsRunIcon fontSize="large"/>
    {/* </div> */}
    </CardOrg>
  )
}

export default Card