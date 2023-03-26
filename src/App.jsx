import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [locations, setLocations] = useState([]);

  const charactersUrl = "https://rickandmortyapi.com/api/character/?page=2";
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
  };

  const fetchLocations = async () => {
    const response = await fetch(locationsUrl);
    const data = await response.json();
    console.log(data);
    setLocations(data.results);
  };

  const fetchCharacters = async () => {
    const response = await fetch(charactersUrl);
    const data = await response.json();
    console.log(data);
    setCharacters(data.results);
  };

  return (
    <div className="App">
      {/* //! header */}
      <header>
        <h1>Altcademy Movie Finder Rick and Morty</h1>
        <p>React Movie finder Rick and Morty edition</p>
      </header>

      <nav>
        <button onClick={fetchEpisodes}>Episodes</button>
        <button onClick={fetchCharacters}>Characters</button>
        <button onClick={fetchLocations}>Locations</button>
        <input type="text" />
      </nav>

      {/* //! main */}
      <main>
        <div id="results">
          {characters.map((character) => (
            <div key={character.id}>
              <h2>{character.name}</h2>
              <img src={character.image} alt={character.name} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
