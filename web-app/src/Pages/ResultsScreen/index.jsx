import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '../../Components/Results/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Geocode from "react-geocode";
import data from "../../index.json"
import moment from "moment";

Geocode.setApiKey("AIzaSyDy_tsEgUnqT0Pca81QJqzYVf_39Ox9IH4");
Geocode.setRegion("cs");
Geocode.enableDebug();

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
  const [isShownNext, showNext] = React.useState(false)
  const handleClick = (id) => {
    setButtonId(id)
  }

  const getHoursAndMinutes = (seconds) => {
    if (seconds > 0) {
      const hours = seconds / 3600
      const minutes = (seconds / 60) % 60
      return `${Math.trunc(hours)}h:${minutes}min`
    }
    return `${0}h:${0}min`
  }

  const navigate = useNavigate();

  return (
    <div style={{ margin: "0 auto", width: "90%" }}>
      {/* <Button onClick={() => { navigate("/"); }} style={{ display: "flex", justifyContent: "left", alignItems: "center", color: "#000", fontWeight: "bold" }}>Back</Button> */}
      <div style={{ border: "1px solid rgba(0, 0, 0, 0.23)", margin: "20px 0", borderRadius: "10px" }}>
        <p>Z <span style={{ fontWeight: "bold" }}>{localStorage.getItem("startLocation")}</span> do <span style={{ fontWeight: "bold" }}>{localStorage.getItem("location")}</span></p>
        <p><span style={{ fontWeight: "bold" }}>{moment(localStorage.getItem("time")).format('DD MMMM YYYY, h:mm')}</span> doba parkování <span style={{ fontWeight: "bold" }}>{getHoursAndMinutes(localStorage.getItem("parkingTime"))}</span></p>
      </div>
      <ThemeProvider theme={theme}>
        <ButtonGroup aria-label="outlined primary button group" style={{ width: "100%", borderColor: "rgba(0, 0, 0, 0.63)" }}>
          <Button onClick={() => handleClick(1)} variant={buttonId === 1 ? "contained" : "outlined"} style={{ width: "33%" }}>čas</Button>
          <Button onClick={() => handleClick(2)} variant={buttonId === 2 ? "contained" : "outlined"} style={{ width: "33%" }}>cena</Button>
          <Button onClick={() => handleClick(3)} variant={buttonId === 3 ? "contained" : "outlined"} style={{ width: "33%" }}>vzdálenost</Button>
        </ButtonGroup>
      </ThemeProvider>

    <Card data={data[0]} />
    <Card data={data[1]} />
    <Card data={data[2]} />
    {isShownNext && (
      <div>
        <Card data={data[3]} />
        <Card data={data[4]} />
        <Card data={data[5]} />
        <Card data={data[6]} />
        <Card data={data[7]} />
      </div>
    )}

      <Button onClick={() => showNext(true)} variant="outlined" style={{ margin: "20px 0", width: "100%", borderColor: "rgba(0, 0, 0, 0.23)", color: "rgba(0, 0, 0, 0.63)", borderRadius: "10px" }}>Zobrazit další parkoviště</Button>
    </div>
  )
}