import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Home from "./components/Home";
import MapView from "./components/MapView";
import Search from "./components/Search";
import Profile from "./components/Profile";

function App() {
	const [user, setUser] = useState(null);

	return (
		<Router>
			<div className="App">
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Brand as={Link} to="/">
							BoulderMaps
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="mr-auto">
								<Nav.Link as={Link} to="/">
									Home
								</Nav.Link>
								<Nav.Link as={Link} to="/map">
									Map
								</Nav.Link>
								<Nav.Link as={Link} to="/search">
									Search
								</Nav.Link>
								{user && (
									<Nav.Link as={Link} to="/profile">
										Profile
									</Nav.Link>
								)}
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>

				<Container className="mt-3">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/map" element={<MapView />} />
						<Route path="/search" element={<Search />} />
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</Container>
			</div>
		</Router>
	);
}

export default App;
