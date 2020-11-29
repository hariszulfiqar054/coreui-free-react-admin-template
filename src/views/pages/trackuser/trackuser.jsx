import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

function Trackuser(props) {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
      console.log(position.coords.latitude);
    });
  }, []);
  return (
    <Map
      google={props.google}
      zoom={15}
      center={{ lat: location?.latitude, lng: location?.longitude }}
      centerAroundCurrentLocation
      // initialCenter={{ lat: 30.3753, lng: 69.3451 }}
    >
      <Marker
        onClick={() => console.log("marker")}
        name={"Current location"}
        position={{ lat: location?.latitude, lng: location?.longitude }}
      />

      {/* <InfoWindow onClose={this.onInfoWindowClose}>
        <div>
          <h1>{this.state.selectedPlace.name}</h1>
        </div>
      </InfoWindow> */}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBM07T-MkC4QGBrD-qFVpj_2YDrGdhYD1A",
})(Trackuser);
