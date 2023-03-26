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
      <button onClick={() => props.setCurrentTab("episodes")}>Episodes</button>
      <button onClick={() => props.setCurrentTab("characters")}>
        Characters
      </button>
      <button onClick={() => props.setCurrentTab("locations")}>
        Locations
      </button>
      <input type="text" onChange={props.filterCharacters} />
    </nav>
  );
};

//! Main component
const Main = ({
  currentTab,
  handleNext,
  handlePrevious,
  episodes,
  episode,
  locations,
  characters,
}) => {
  let results = null;

  if (currentTab === "episodes") {
    results = (
      <>
        <main>
          <div id="results">
            {episodes.map((episode) => (
              <div key={episode.id} className="item-wrapper">
                <h2>{episode.name}</h2>
                <p>{episode.episode}</p>
                <p>{episode.air_date}</p>
              </div>
            ))}
          </div>
          <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
        </main>
      </>
    );
  } else if (currentTab === "locations") {
    results = (
      <>
        <main>
          <div id="results">
            {locations.map((location) => (
              <div key={location.id} className="item-wrapper">
                <h2>{location.name}</h2>
                <p>{location.type}</p>
                <p>{location.dimension}</p>
              </div>
            ))}
          </div>
          <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
        </main>
      </>
    );
  } else if (currentTab === "characters") {
    results = (
      <>
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
            <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
          </div>
        </main>
      </>
    );
  }

  return results;
};

const Buttons = (props) => {
  return (
    <div>
      <button onClick={props.handlePrevious}>Previous</button>
      <button onClick={props.handleNext}>Next</button>
    </div>
  );
};

function App() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("episodes");

  const charactersUrl = `https://rickandmortyapi.com/api/character/?page=${page}`;
  const episodesUrl = `https://rickandmortyapi.com/api/episode?page=${page}`;
  const locationsUrl = `https://rickandmortyapi.com/api/location?page=${page}`;

  const filterCharacters = (event) => {
    //! Will be used to filter characters
    const searchValue = event.target.value;
    console.log(searchValue);
  };

  const fetchEpisodes = async () => {
    const response = await fetch(episodesUrl);
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setPage(page - 1);
      return;
    }
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

    switch (currentTab) {
      case "episodes":
        fetchEpisodes();
        break;
      case "locations":
        fetchLocations();
        break;
      case "characters":
        fetchCharacters();
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      clearResults();

      switch (currentTab) {
        case "episodes":
          fetchEpisodes();
          break;
        case "locations":
          fetchLocations();
          break;
        case "characters":
          fetchCharacters();
          break;
        default:
          break;
      }
    }
  };

  /* Function to empty result container */
  const clearResults = () => {
    setCharacters([]);
    setEpisodes([]);
    setLocations([]);
  };

  useEffect(() => {
    setPage(1);
  }, [currentTab]);

  useEffect(() => {
    switch (currentTab) {
      case "episodes":
        fetchEpisodes();
        break;
      case "locations":
        fetchLocations();
        break;
      case "characters":
        fetchCharacters();
        break;
      default:
        break;
    }
  }, [page]);

  return (
    <div className="App">
      {/* APP */}
      <Header />
      <Navigation
        filterCharacters={filterCharacters}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />

      <Main
        currentTab={currentTab}
        episodes={episodes}
        locations={locations}
        characters={characters}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}

export default App;
