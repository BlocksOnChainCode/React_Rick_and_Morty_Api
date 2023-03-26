// ! Components for conditional rendering
const Episodes = ({ episodes }) => {
  return (
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
  );
};

const Locations = ({ locations }) => {
  return (
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
  );
};

const Characters = ({ characters }) => {
  return (
    <main>
      <div id="results">
        {characters.map((character) => (
          <div key={character.id} className="item-wrapper">
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
            <p>{character.species}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

//! Main component
const Main = ({ currentTab, episodes, locations, characters }) => {
  let results = null;

  if (currentTab === "episodes") {
    results = <Episodes episodes={episodes} />;
  } else if (currentTab === "locations") {
    results = <Locations locations={locations} />;
  } else if (currentTab === "characters") {
    results = <Characters characters={characters} />;
  }

  return results;
};

export default Main;
