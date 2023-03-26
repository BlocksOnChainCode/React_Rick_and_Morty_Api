import { useState, useEffect } from "react";
import { Header, Navigation, Buttons } from "./components";
/* import {
  fetchCharacters,
  fetchEpisodes,
  fetchLocations,
  fetchFunction,
  fetchFunctions,
} from "./javascript"; */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

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
        </main>
        <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
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
        </main>
        <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
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
          </div>
          <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
        </main>
      </>
    );
  }

  return results;
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

  const handleNavigation = (event) => {
    const tab = event.target.textContent.toLowerCase();
    setCurrentTab(tab);
    setPage(1);
    clearResults();
  };

  const clearResults = () => {
    setCharacters([]);
    setEpisodes([]);
    setLocations([]);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const filterCharacters = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    fetch(charactersUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setCharacters(data.results);
      })
      .catch((error) => {
        if (error.message === "404") {
          setPage(page - 1);
        }
      });
  }, [charactersUrl, page]);

  useEffect(() => {
    fetch(episodesUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setEpisodes(data.results);
      })
      .catch((error) => {
        if (error.message === "404") {
          setPage(page - 1);
        }
      });
  }, [episodesUrl, page]);

  useEffect(() => {
    fetch(locationsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setLocations(data.results);
      })
      .catch((error) => {
        if (error.message === "404") {
          setPage(page - 1);
        }
      });
  }, [locationsUrl, page]);

  useEffect(() => {
    const filteredCharacters = characters.filter((character) => {
      return character.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setCharacters(filteredCharacters);
  }, [searchValue]);

  return (
    <div className="App">
      {/* APP */}
      <Header />
      <Navigation
        filterCharacters={filterCharacters}
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        handleNavigation={handleNavigation}
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
