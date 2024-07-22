import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search functionality
    const mockResults = [
      { id: 1, name: 'Climb 1', grade: '5.10a' },
      { id: 2, name: 'Climb 2', grade: '5.11b' },
    ].filter(climb => climb.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(mockResults);
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search for climbs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <ListGroup className="mt-3">
        {searchResults.map(climb => (
          <ListGroup.Item key={climb.id}>
            {climb.name} - Grade: {climb.grade}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Search;