import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

//! Header component
const Header = () => {
  return (
    <header>
      <h1>Altcademy Movie Finder Rick and Morty</h1>
      <p>React Movie finder Rick and Morty edition</p>
    </header>
  );
};

//! Navigation component
const Navigation = (props) => {
  return (
    <nav>
      <button onClick={() => setCurrentTab("episodes")}>Episodes</button>
      <button onClick={() => setCurrentTab("characters")}>Characters</button>
      <button onClick={() => setCurrentTab("locations")}>Locations</button>
      <input type="text" onChange={props.filterCharacters} />
    </nav>
  );
};

//! Main component

function App() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("episodes");

  const charactersUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const episodesUrl = "https://rickandmortyapi.com/api/episode";
  const locationsUrl = "https://rickandmortyapi.com/api/location";

  const filterCharacters = (event) => {
    //! Will be used to filter characters
    const searchValue = event.target.value;
    console.log(searchValue);
  };

  const fetchEpisodes = async () => {
    const response = await fetch(episodesUrl);
    const data = await response.json();
    console.log(data);
    setEpisodes(data.results);
    setCurrentTab("episodes");
  };

  const fetchLocations = async () => {
    const response = await fetch(locationsUrl);
    const data = await response.json();
    console.log(data);
    setLocations(data.results);
    setCurrentTab("locations");
  };

  const fetchCharacters = async () => {
    const response = await fetch(charactersUrl);
    const data = await response.json();
    console.log(data);
    setCharacters(data.results);
    setCurrentTab("characters");
  };

  const handleNext = () => {
    setPage(page + 1);
    clearResults();
    fetchCharacters();
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      clearResults();
      fetchCharacters();
    }
  };

  /* Function to empty result container */
  const clearResults = () => {
    setCharacters([]);
    setEpisodes([]);
    setLocations([]);
  };

  useEffect(() => {
    clearResults();
    fetchCharacters();
  }, [page]);

  useEffect(() => {
    // Fetch data depending on the currentTab state
    if (currentTab === "episodes") {
      fetchEpisodes();
    } else if (currentTab === "locations") {
      fetchLocations();
    } else {
      fetchCharacters();
    }
  }, [currentTab]);

  return (
    <div className="App">
      {/* APP */}
      <Header />
      <Navigation />

      {/* //! main */}
      <main>
        <div id="results">
          {characters.map((character) => (
            <div key={character.id} className="item-wrapper">
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
              <p>{character.species}</p>
              <p>{character.origin.name}</p>
              <p>{character.status}</p>
              <p>{character.gender}</p>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handlePrevious}>Previous</button>
          {/* Onclick increment page state by one */}
          <button onClick={handleNext}>Next</button>
        </div>
      </main>
    </div>
  );
}

export default App;
