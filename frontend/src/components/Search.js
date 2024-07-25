import React, { useState } from "react";
import axios from "axios";

const Search = ({ onSelect }) => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	const handleSearch = async () => {
		if (!query) return;
		try {
			const response = await axios.get(
				`http://localhost:5000/search?query=${query}`
			);
			setResults(response.data);
		} catch (error) {
			console.error("Error searching climbs:", error);
		}
	};

	const handleSelect = (climb) => {
		onSelect(climb);
		setQuery("");
		setResults([]);
	};

	return (
		<div className="search">
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search for climbs..."
			/>
			<button onClick={handleSearch}>Search</button>
			<ul>
				{results.map((climb) => (
					<li key={climb.id} onClick={() => handleSelect(climb)}>
						{climb.name} - {climb.difficulty} - {climb.location}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Search;
