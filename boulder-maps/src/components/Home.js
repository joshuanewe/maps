import React from "react";
import MapView from "./MapView";

const Home = () => {
	return (
		<div className="home">
			<h1>Welcome to BoulderMaps</h1>
			<p>Discover and explore bouldering routes in your area!</p>
			<div className="map-container" style={{ height: "70vh", width: "100%" }}>
				<MapView />
			</div>
		</div>
	);
};

export default Home;
