import React from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import CardOrg from '@mui/material/Card';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDy_tsEgUnqT0Pca81QJqzYVf_39Ox9IH4");
Geocode.setRegion("cs");
Geocode.enableDebug();

const Card = ({ data }) => {
  const [address, setAddress] = React.useState('')

  const getAddress = (lat, lon) => {
    Geocode.fromLatLng(lat, lon).then(
      (response) => {
        setAddress(response.results[0].formatted_address);
      },
      (error) => {
        console.error("Error", error);
      }
    );
  }

  return (
    <CardOrg variant="outlined" style={{marginTop: "20px", paddingBottom: "20px", borderColor: "rgba(0, 0, 0, 0.23)", borderRadius: "10px"}} >
      <div style={{height: "50px", flexDirection: "row", gap: "50px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.13)" }}>
        <span style={{fontWeight: "bold", fontSize: "16px"}}>{getAddress(data.parkingSpotLatitude, data.parkingSpotLongitude)}{address}</span>
      </div>
      <Divider />
      <div style={{ flexDirection: "row", display: "flex", gap: "10px", alignContent: "space-between", justifyContent: "center", alignItems: "center", height: "50px" }}>
        <div>
          <span style={{fontWeight: "bold"}}>Volných míst</span> xx z xx
        </div>
        <div>
          <span style={{fontWeight: "bold"}}>Nehodovost</span> x/měsíc
        </div>
        <div>
          <span style={{fontWeight: "bold"}}>Přestupků</span> x/měsíc
        </div>
      </div>
      <Divider />
      <div style={{flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "space-around", gap:"150px", margin: "0 30px"}}>
        <p><span style={{fontWeight: "bold"}}>Parkování za cenu:</span> {data.price} Kč</p>
        <Button onClick={() => alert("Není co zaplatit!")} variant="outlined">Zaplatit</Button>
      </div>
      <div style={{ flexDirection: "row", gap: "15px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>autem {Math.round((data.durationParking / 60) % 60)} minut, {data.distanceParking} metrů</p>
        <p style={{fontSize: "20px"}}>&gt;</p>
        <p>pěšky {Math.round((data.durationTarget / 60) % 60)} minut, {data.distanceTarget} metrů</p>
      </div>
      <div style={{ flexDirection: "row", gap: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <DirectionsCarIcon fontSize="large" color="success" style={{color: "#F39C12"}} />
      <div>
        <div style={{border: "2px solid #F39C12", marginBottom: "2px"}}></div>
        <Button onClick={() => {window.open(`https://www.google.com/maps/@${data.parkingSpotLatitude},${data.parkingSpotLongitude}`, "_blank")}} style={{width: "30px", height: "25px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.33)", fontSize: "12px", borderColor: "rgba(0, 0, 0, 0.33)"}} variant="outlined">Začít</Button>
      </div>
      <LocalParkingIcon fontSize="large" color="primary" />
      <div>
        <div style={{border: "2px solid #27AE60", marginBottom: "2px"}}></div>
        <Button onClick={() => {window.open("https://www.google.com/maps/@49.1966628,16.6343531", "_blank")}} style={{width: "30px", height: "25px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.33)", fontSize: "12px", borderColor: "rgba(0, 0, 0, 0.43)"}} variant="outlined">Začít</Button>
      </div>
      <DirectionsRunIcon fontSize="large" style={{color: "#27AE60"}} />
      </div>
    </CardOrg>
  )
}

export default Card