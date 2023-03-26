const filterCharacters = (event) => {
  const searchValue = event.target.value;
  setSearchValue(searchValue);
};

const handleFetchError = (error) => {
  console.error(error);
  // show an error message to the user
  // reset the page to the previous one
  setPage(page - 1);
};

const fetchEpisodes = async () => {
  try {
    const response = await fetch(episodesUrl);
    const data = await response.json();
    if (data.error) {
      setPage(page - 1);
      return;
    }
    setEpisodes(data.results);
    setCurrentTab("episodes");
  } catch (error) {
    handleFetchError(error);
  }
};

const fetchLocations = async () => {
  try {
    const response = await fetch(locationsUrl);
    const data = await response.json();
    if (data.error) {
      setPage(page - 1);
      return;
    }
    setLocations(data.results);
    setCurrentTab("locations");
  } catch (error) {
    handleFetchError(error);
  }
};

const fetchCharacters = async () => {
  try {
    const response = await fetch(charactersUrl);
    const data = await response.json();
    if (data.error) {
      setPage(page - 1);
      return;
    }
    setCharacters(data.results);
    setCurrentTab("characters");
  } catch (error) {
    handleFetchError(error);
  }
};

const fetchFunctions = {
  episodes: fetchEpisodes,
  locations: fetchLocations,
  characters: fetchCharacters,
};

const fetchFunction = fetchFunctions[currentTab];
export {
  fetchEpisodes,
  fetchLocations,
  fetchCharacters,
  filterCharacters,
  fetchFunctions,
  fetchFunction,
};
