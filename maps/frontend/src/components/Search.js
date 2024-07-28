import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ onSelect }) => {
	const [query, setQuery] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [area, setArea] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedClimb, setSelectedClimb] = useState(null);

	useEffect(() => {
		const fetchResults = async () => {
			if (query.length === 0 && difficulty.length === 0 && area.length === 0) {
				setResults([]);
				return;
			}
			setLoading(true);
			try {
				const response = await axios.get("http://localhost:5000/search", {
					params: { query, difficulty, area },
				});
				setResults(response.data);
				setError(null);
			} catch (err) {
				setError("Error fetching search results");
			}
			setLoading(false);
		};

		const debounceFetch = setTimeout(fetchResults, 300);
		return () => clearTimeout(debounceFetch);
	}, [query, difficulty, area]);

	const handleSelect = (climb) => {
		setSelectedClimb(climb);
		onSelect(climb);
	};

	const clearSelection = () => {
		setSelectedClimb(null);
	};

	return (
		<div className="search-component">
			<input
				type="text"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					clearSelection();
				}}
				placeholder="Search for climbs"
			/>
			<input
				type="text"
				value={difficulty}
				onChange={(e) => {
					setDifficulty(e.target.value);
					clearSelection();
				}}
				placeholder="Filter by difficulty"
			/>
			<input
				type="text"
				value={area}
				onChange={(e) => {
					setArea(e.target.value);
					clearSelection();
				}}
				placeholder="Filter by area"
			/>
			{loading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			<ul>
				{results.map((climb) => (
					<li
						key={climb.id}
						onClick={() => handleSelect(climb)}
						style={{
							background:
								selectedClimb && selectedClimb.id === climb.id
									? "#ddd"
									: "transparent",
						}}
					>
						{climb.name} - {climb.area} - {climb.difficulty}
					</li>
				))}
			</ul>
			{selectedClimb && (
				<div>
					<h2>Selected Climb:</h2>
					<p>{selectedClimb.name}</p>
					<p>{selectedClimb.area}</p>
					<p>{selectedClimb.difficulty}</p>
					<button onClick={clearSelection}>Clear Selection</button>
				</div>
			)}
		</div>
	);
};

export default Search;
