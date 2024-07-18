import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";

import Search from "./Search";

const MAPBOX_TOKEN =
	"pk.eyJ1Ijoiam9zaHVhbmV3ZSIsImEiOiJjbHlyNWlnNTMwM2ZrMmpvaTdjYnR1Y2M5In0.cPs-Jxueeo6tNBkbNFy1HA"; // Replace with your Mapbox token

const MapView = () => {
	const [viewport, setViewport] = useState({
		latitude: 40.7128,
		longitude: -74.006,
		zoom: 10,
	});
	const [selectedClimb, setSelectedClimb] = useState(null);
	const [climbs, setClimbs] = useState([]);

	useEffect(() => {
		// Mock API call to fetch climbs
		const fetchClimbs = async () => {
			// In a real app, this would be an API call
			const mockClimbs = [
				{
					id: 1,
					name: "Climb 1",
					latitude: 40.7128,
					longitude: -74.006,
					grade: "5.10a",
					stars: 4,
				},
				{
					id: 2,
					name: "Climb 2",
					latitude: 40.7228,
					longitude: -74.016,
					grade: "5.11b",
					stars: 3,
				},
			];
			setClimbs(mockClimbs);
		};

		fetchClimbs();
	}, []);

	return (
		<div className="map-container">
			<Map
				mapboxAccessToken={MAPBOX_TOKEN}
				initialViewState={{
					longitude: -122.4,
					latitude: 37.8,
					zoom: 14,
				}}
				style={{ width: 600, height: 400 }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
			>
				{climbs.map((climb) => (
					<Marker
						key={climb.id}
						latitude={climb.latitude}
						longitude={climb.longitude}
					>
						<button
							className="marker-btn"
							onClick={(e) => {
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
			</Map>
			<div className="search-container">
				<Search />
			</div>
		</div>
	);
};

export default MapView;
