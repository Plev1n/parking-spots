import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import Card from '../../Components/Results/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.43)",
            borderColor: "rgba(0, 0, 0, 0.43)"
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: "rgba(0, 0, 0, 0.63)",
            borderColor: "rgba(0, 0, 0, 0.43)"
          }
        }
      ]
    },
  },
});

export const ResultsScreen = props => {
  const [buttonId, setButtonId] = React.useState(1)
  const handleClick = (id) => {
    setButtonId(id)
  }

  const navigate = useNavigate();

  return (
    <div style={{ margin: "0 auto", width: "500px" }}>
      <Button onClick={() => {navigate("/");}} style={{display: "flex", justifyContent: "left", alignItems: "center", color: "#000", fontWeight: "bold"}}>Back</Button>
      <div style={{ border: "1px solid rgba(0, 0, 0, 0.23)", marginBottom: "20px", borderRadius: "10px" }}>
        <p>Z <span style={{ fontWeight: "bold" }}>{"Czechitas"}</span> do <span style={{ fontWeight: "bold" }}>{"Kavárna Spolek"}</span></p>
        <p>ne 10.dubna 2022 11:37 doba parkování <span style={{ fontWeight: "bold" }}>{"1:30"}</span></p>
      </div>
      <ThemeProvider theme={theme}>
        <ButtonGroup aria-label="outlined primary button group" style={{ width: "500px", borderColor: "rgba(0, 0, 0, 0.63)" }}>
          <Button onClick={() => handleClick(1)} variant={buttonId === 1 ? "contained" : "outlined"} style={{ width: "200px" }}>čas</Button>
          <Button onClick={() => handleClick(2)} variant={buttonId === 2 ? "contained" : "outlined"} style={{ width: "200px" }}>cena</Button>
          <Button onClick={() => handleClick(3)} variant={buttonId === 3 ? "contained" : "outlined"} style={{ width: "200px" }}>vzdálenost</Button>
        </ButtonGroup>
      </ThemeProvider>
      <div style={{ gap: "20px" }}>
        <Card />
        <Card />
        <Card />
      </div>
      <Button onClick={() => alert("No more parking slots!")} variant="outlined" style={{ margin: "20px 0", width: "100%", borderColor: "rgba(0, 0, 0, 0.23)", color: "rgba(0, 0, 0, 0.63)", borderRadius: "10px" }}>Zobrazit další parkoviště</Button>
    </div>
  )
}