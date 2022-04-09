import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Card from '../../Components/Results/Card';

export const ResultsScreen = props => {
  return (
    <div style={{margin:"0 auto", width: "600px"}}>
      <p>Z <span style={{fontWeight: "bold"}}>{"Czechitas"}</span> do <span style={{fontWeight: "bold"}}>{"Kavárna Spolek"}</span></p>
      <p>ne 10.dubna 2022 11:37 doba parkování <span style={{fontWeight: "bold"}}>{"1:30"}</span></p>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <div style={{gap: "20px"}}>
        <Card />
        <Card />
        <Card />
      </div>
      <div style={{margin:"0 auto", border: "1px solid #000", borderRadius: "4px"}}>
        Zobrazit další parkoviště
      </div>
    </div>
  )
}