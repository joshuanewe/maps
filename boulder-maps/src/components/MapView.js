import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9zaHVhbmV3ZSIsImEiOiJjbGhwbno2cjgwNTUyM2lvNnJxbTNra3RkIn0.NhGO8kfTufmrBgGMf5QE2Q'; // Replace with your Mapbox token

const MapView = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 10
  });
  const [selectedClimb, setSelectedClimb] = useState(null);
  const [climbs, setClimbs] = useState([]);

  useEffect(() => {
    // Mock API call to fetch climbs
    const fetchClimbs = async () => {
      // In a real app, this would be an API call
      const mockClimbs = [
        { id: 1, name: 'Climb 1', latitude: 40.7128, longitude: -74.0060, grade: '5.10a', stars: 4 },
        { id: 2, name: 'Climb 2', latitude: 40.7228, longitude: -74.0160, grade: '5.11b', stars: 3 },
      ];
      setClimbs(mockClimbs);
    };

    fetchClimbs();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="70vh"
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {climbs.map(climb => (
        <Marker 
          key={climb.id} 
          latitude={climb.latitude} 
          longitude={climb.longitude}
        >
          <button
            className="marker-btn"
            onClick={e => {
              e.preventDefault();
              setSelectedClimb(climb);
            }}
          >
            📍
          </button>
        </Marker>
      ))}

      {selectedClimb && (
        <Popup
          latitude={selectedClimb.latitude}
          longitude={selectedClimb.longitude}
          onClose={() => setSelectedClimb(null)}
        >
          <div>
            <h2>{selectedClimb.name}</h2>
            <p>Grade: {selectedClimb.grade}</p>
            <p>Stars: {selectedClimb.stars}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default MapView;