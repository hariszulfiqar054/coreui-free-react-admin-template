import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import io from "socket.io-client";
import Env from "../../../env/env";
import { useSelector } from "react-redux";

const socket = io(Env.SOCKET_URL);
function Trackuser(props) {
  const [salesman, setSalesman] = useState([]);
  const [location, setLocation] = useState(null);
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (socket) {
      socket.on("updatedLocation", (data) => {
        let check = salesman?.findIndex((loc) => data?.id === loc?.id);
        if (check >= 0) {
          let temp = [...salesman];
          temp[check] = { ...temp[check], ...data };
          setSalesman(temp);
        } else {
          setSalesman([...salesman, data]);
        }
      });
    }
  }, [salesman]);

  useEffect(() => {
    if (socket) {
      socket.emit("locationSocket", user?.city);
    }
    return () => {
      if (socket) return socket.emit("leaveRoomLocation", user?.city);
    };
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position.coords);
    });
  }, []);

  console.log(salesman);
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

      {salesman?.map((data) => (
        <Marker
          name={data?.name}
          position={{ lat: data?.lat, lng: data?.lng }}
          title={data?.name}
          icon={{
            url:
              "https://images.vexels.com/media/users/3/152654/isolated/preview/e5694fb12916c00661195c0a833d1ba9-sports-bike-icon-by-vexels.png",
            anchor: new props.google.maps.Point(32, 32),
            scaledSize: new props.google.maps.Size(64, 64),
          }}
        />
      ))}

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
