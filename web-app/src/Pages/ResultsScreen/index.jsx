import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Card from '../../Components/Results/Card';

export const ResultsScreen = props => {
  return (
    <div style={{margin:"0 auto"}}>
      <p>Z Czechitas do Kavárna Spolek</p>
      <p>ne 10.dubna 2022 11:37 doba parkování 1:30</p>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <Card />
      <div>
        <p>Parkoviště ulice ........  </p>
        <p>Volných míst 70 z 80</p>
        <p>Nehodovost 2/měsíc</p>
        <p>Přestupků 0/měsíc</p>
        <p>Cena za parkování: 70Kč</p>
        
      </div>
      <div>
        <p>Parkoviště ulice ........  </p>
        <p>Volných míst 70 z 80</p>
        <p>Nehodovost 2/měsíc</p>
        <p>Přestupků 0/měsíc</p>
        <p>Cena za parkování: 70Kč</p>
        <DirectionsCarIcon />.....
        <LocalParkingIcon />.....
        <DirectionsRunIcon />
      </div>
      <div>
        <p>Parkoviště ulice ........  </p>
        <p>Volných míst 70 z 80</p>
        <p>Nehodovost 2/měsíc</p>
        <p>Přestupků 0/měsíc</p>
        <p>Cena za parkování: 70Kč</p>
        <DirectionsCarIcon />.....
        <LocalParkingIcon />.....
        <DirectionsRunIcon />
      </div>
    </div>
  )
}