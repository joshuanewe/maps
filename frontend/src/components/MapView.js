import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import Supercluster from "supercluster";

import Search from "./Search";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const MapView = () => {
	const [viewport, setViewport] = useState({
		latitude: 47.6062, // Default to Seattle, WA for rock climbs
		longitude: -122.3321,
		zoom: 10,
	});
	const [selectedClimb, setSelectedClimb] = useState(null);
	const [climbs, setClimbs] = useState([]);
	const [clusteredPoints, setClusteredPoints] = useState([]);
	const [cluster, setCluster] = useState(null);

	useEffect(() => {
		// Fetch climbs from your Flask API
		const fetchClimbs = async () => {
			try {
				const response = await axios.get("http://localhost:5000/climbs");
				const points = response.data.map((climb) => ({
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [climb.longitude, climb.latitude],
					},
					properties: {
						id: climb.id,
						name: climb.name,
						difficulty: climb.difficulty,
						...climb,
					},
				}));
				// Initialize clustering
				const clusterInstance = new Supercluster({
					radius: 40,
					maxZoom: 16,
				});
				clusterInstance.load(points);
				setCluster(clusterInstance);
			} catch (error) {
				console.error("Error fetching climbs:", error);
			}
		};

		fetchClimbs();
	}, []);

	useEffect(() => {
		// Update clusters when viewport changes
		if (cluster) {
			const bounds = [
				viewport.longitude - 360 / Math.pow(2, viewport.zoom),
				viewport.latitude - 180 / Math.pow(2, viewport.zoom),
				viewport.longitude + 360 / Math.pow(2, viewport.zoom),
				viewport.latitude + 180 / Math.pow(2, viewport.zoom),
			];
			const clusters = cluster.getClusters(bounds, Math.round(viewport.zoom));
			setClusteredPoints(clusters);
		}
	}, [viewport, cluster]);

	const handleClusterClick = (clusterId, longitude, latitude) => {
		const expansionZoom = Math.min(
			cluster.getClusterExpansionZoom(clusterId),
			20
		);
		setViewport({
			...viewport,
			longitude,
			latitude,
			zoom: expansionZoom,
		});
	};

	const handleSearchSelect = (climb) => {
		setSelectedClimb(climb);
		setViewport({
			...viewport,
			longitude: climb.longitude,
			latitude: climb.latitude,
			zoom: 14,
		});
	};

	return (
		<div className="map-container">
			<Map
				mapboxAccessToken={MAPBOX_TOKEN}
				initialViewState={viewport}
				style={{ width: "100%", height: "90vh" }} // Adjust size as needed
				mapStyle="mapbox://styles/mapbox/streets-v9"
				onMove={(evt) => setViewport(evt.viewState)}
			>
				{clusteredPoints.map((point) => {
					const [longitude, latitude] = point.geometry.coordinates;
					const {
						cluster: isCluster,
						point_count: pointCount,
						id,
					} = point.properties;

					return (
						<Marker key={id} latitude={latitude} longitude={longitude}>
							<button
								className="marker-btn"
								onClick={(e) => {
									e.preventDefault();
									if (isCluster) {
										handleClusterClick(point.id, longitude, latitude);
									} else {
										setSelectedClimb(point.properties);
									}
								}}
							>
								{isCluster ? `${pointCount} climbs` : "📍"}
							</button>
						</Marker>
					);
				})}

				{selectedClimb && (
					<Popup
						latitude={selectedClimb.latitude}
						longitude={selectedClimb.longitude}
						onClose={() => setSelectedClimb(null)}
					>
						<div>
							<h2>{selectedClimb.name}</h2>
							<p>Grade: {selectedClimb.difficulty}</p>
							<p>Stars: {selectedClimb.star_rating}</p>
						</div>
					</Popup>
				)}
			</Map>
			<div className="search-container">
				<Search onSelect={handleSearchSelect} />
			</div>
		</div>
	);
};

export default MapView;
