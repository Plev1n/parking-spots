import React from 'react'
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Stack from '@mui/material/Stack';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDy_tsEgUnqT0Pca81QJqzYVf_39Ox9IH4");
Geocode.setRegion("cs");
Geocode.enableDebug();

const Location = (props) => {
  const [isSelectShown, showSelect] = React.useState(false)
  const [location, setLocation] = React.useState('')

  const handleChange = (event) => {
    setLocation(event.target.value)
    props.setLocation(event.target.value)
    event.preventDefault()
  }

  const handleLocationSubmit = () => {
    let lat, lon, address;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat,lon)
      Geocode.fromLatLng(lat, lon).then(
        (response) => {
          address = response.results[0].formatted_address;
          console.log(address);
          props.setLocation(address)
          setLocation(address)
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  return (
    <Stack spacing={2}>
      <TextField id="outlined-basic" label="Kam" variant="outlined" value={location} onClick={() => showSelect(!isSelectShown)} onChange={(event) => handleChange(event)} />
      {isSelectShown && <IconButton onClick={handleLocationSubmit}><AddLocationAltIcon /> <span style={{ fontSize: "10px" }}>Moje poloha</span></IconButton>}
    </Stack>
  )
}

export default Location