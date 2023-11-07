import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

const mapContainerStyle = {
  width: '600px',
  height: '450px',
};

const center = {
  lat: 38.9575,
  lng: -95.6757,
};

function Home() {
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const searchBoxRef = useRef(null);

  const onLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places[0];

    setSelectedPlace({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  };

  return (
    <>
        <style>
            {`
            input::placeholder {
                color: black !important;
                opacity: 1; /* Firefox */
            }
            `}
        </style>
        <LoadScript
        googleMapsApiKey="AIzaSyATo7H9Mp-hReRef17fJejKxf8aVB8acN4"
        libraries={libraries}
        >
        <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
        >
            <input
            type="text"
            placeholder="Enter a location"
            style={{
                width: `240px`,
                border: `1px solid black`,
                height: `32px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                marginBottom: `5px`
            }}
            />
        </StandaloneSearchBox>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={setMap}
        >
            {selectedPlace && (
            <Marker
                position={selectedPlace}
            />
            )}
        </GoogleMap>
        </LoadScript>
    </>
  );
}

export default Home;