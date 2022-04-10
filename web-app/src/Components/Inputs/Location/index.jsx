import React from 'react'
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Stack from '@mui/material/Stack';
import Geocode from "react-geocode";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

Geocode.setApiKey("AIzaSyDy_tsEgUnqT0Pca81QJqzYVf_39Ox9IH4");
Geocode.setRegion("cs");
Geocode.enableDebug();

const Location = (props) => {
  const [isSelectShown, showSelect] = React.useState(false)
  const [location, setLocation] = React.useState('')

  const handleChange = (address) => {
    let lat, lon;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      props.setStartLat(lat)
      props.setStartLon(lon)
    });
    setLocation(address)
    localStorage.setItem("location", address)
  }

  const handleLocationSubmit = () => {
    let lat, lon, address;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      props.setStartLat(lat)
      props.setStartLon(lon)
      props.setFinishLat(lat)
      props.setFinishLon(lon)
      Geocode.fromLatLng(lat, lon).then(
        (response) => {
          address = response.results[0].formatted_address;
          setLocation(address)
          localStorage.setItem("location", address)
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const lat = latLng.lat
        const lon = latLng.lng
        props.setFinishLat(lat)
        props.setFinishLon(lon)
        Geocode.fromLatLng(lat, lon).then(
          (response) => {
            address = response.results[0].formatted_address;
            setLocation(address)
            localStorage.setItem("location", address)
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch(error => console.error('Error', error));
  };

  const searchOptions = {
    location: new google.maps.LatLng(49.78751813438909, 15.62508660122787),
    radius: 500,
    types: ['address']
  }

  return (
    <Stack spacing={2}>
      <PlacesAutocomplete
        value={location}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              label="Kam"
              id="outlined-basic"
              variant="outlined"
              {...getInputProps({
                className: '',
              })}
              onClick={() => showSelect(!isSelectShown)}
              style={{width: "500px"}}
              value={location}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={i}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {isSelectShown && <IconButton onClick={handleLocationSubmit}><AddLocationAltIcon /> <span style={{ fontSize: "10px" }}>Moje poloha</span></IconButton>}
    </Stack>
  )
}

export default Location