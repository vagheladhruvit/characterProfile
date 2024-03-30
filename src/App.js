// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CharacterCard from './components/CharacterCard';
import CharacterDetails from './components/CharacterDetails';
import SearchFilter from './components/SearchFilter';
import Pagination from './components/Pagination';
import './App.css';

const charactersPerPage = 20; // Number of characters to display per page

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    episodes: '',
  });

  const fetchFilteredCharacterCount = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?${getFilterQueryString()}`);
      const data = await response.json();
      return data.info.count;
    } catch (error) {
      console.error('Error fetching filtered character count:', error);
      return 0;
    }
  };

  const getFilterQueryString = () => {
    const filterParams = Object.entries(filters)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => {
        if (key === 'name' || key === 'location' || key === 'episode') {
          return `${key}=${encodeURIComponent(value)}`;
        }
        return null;
      })
      .filter((param) => param !== null)
      .join('&');

    return filterParams ? `&${filterParams}` : '';
  };

  const fetchAllCharacters = async () => {
    try {
      const totalFilteredCount = await fetchFilteredCharacterCount();

      const filteredTotalPages = Math.ceil(totalFilteredCount / charactersPerPage);
      setTotalPages(filteredTotalPages);

      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}&per_page=${charactersPerPage}${getFilterQueryString()}`);
      const data = await response.json();
      setAllCharacters(data.results);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, [currentPage, filters]);

  useEffect(() => {
    // Apply filters to all characters and set filtered characters
    console.log('allCharacters:', allCharacters);
    console.log('filters:', filters);

    if (Array.isArray(allCharacters)) {
      const filteredCharacters = allCharacters.filter(filterCharacters);
      setFilteredCharacters(filteredCharacters);
    }
  }, [allCharacters, filters]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    // Reset current page to 1 when filters change
    setCurrentPage(1);
  };

  const filterCharacters = (character) => {
    const nameFilter = filters.name ? character.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const locationFilter = filters.location
      ? character.location.name.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const episodesFilter = filters.episodes
      ? character.episode.some((episode) => episode.toLowerCase().includes(filters.episodes.toLowerCase()))
      : true;

    return nameFilter && locationFilter && episodesFilter;
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact>
            <SearchFilter filters={filters} onFilterChange={handleFilterChange} />

            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            ) : (
              <p>No matching characters found.</p>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </Route>
          <Route path="/characters/:characterId" component={CharacterDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;