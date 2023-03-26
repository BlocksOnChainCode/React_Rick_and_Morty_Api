import { useState, useEffect } from "react";
import { Header, Navigation, Buttons, Main } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

// ? Fetching data from the API, using the url and page number as parameters.
function useFetch(url) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`${url}?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setData(data.results);
          setError(null);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log(error);
          setPage((prevPage) => prevPage - 1);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url, page, data]);

  return [data, setPage, error];
}

// ! App component
function App() {
  const [currentTab, setCurrentTab] = useState("characters");
  const [characters, setCharactersPage] = useFetch(
    "https://rickandmortyapi.com/api/character"
  );
  const [episodes, setEpisodesPage] = useFetch(
    "https://rickandmortyapi.com/api/episode"
  );
  const [locations, setLocationsPage] = useFetch(
    "https://rickandmortyapi.com/api/location"
  );

  // ! helper functions
  const handleNavigation = (event) => {
    const tab = event.target.textContent.toLowerCase();
    setCurrentTab(tab);
    setCharactersPage(1);
    setEpisodesPage(1);
    setLocationsPage(1);
  };

  const handleNext = () => {
    setCharactersPage((prevPage) => prevPage + 1);
    setEpisodesPage((prevPage) => prevPage + 1);
    setLocationsPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCharactersPage((prevPage) => prevPage - 1);
    setEpisodesPage((prevPage) => prevPage - 1);
    setLocationsPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="App">
      {/* APP */}
      <Header />
      <Navigation
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
      <Buttons handleNext={handleNext} handlePrevious={handlePrevious} />
    </div>
  );
}

export default App;

/**
 * TODO: Make characters clickable and display more information???
 * TODO: Make A Search bar???? (Maybe)
 * TODO: Style cards and make them look better
 * TODO: Maybe a bootstrap modal for the characters extra info???
 * TODO: Deploy to github pages....
 *
 * ? API used: https://rickandmortyapi.com/
 * ? API documentation: https://rickandmortyapi.com/documentation/
 *
 */
