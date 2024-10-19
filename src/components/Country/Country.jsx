/* eslint-disable react/prop-types */

import { useState } from "react";
import styles from "./Country.module.css";

const Country = ({ country, handleVisitedCountries }) => {
  const [isVisited, setIsVisited] = useState(false);
  const { name, flags, population, area } = country;

  const handleIsVisited = (country) => {
    setIsVisited(!isVisited);
    handleVisitedCountries(country);
  };

  return (
    <div className={`${isVisited && styles.visited} ${styles.country}`}>
      <div>
        <h3>
          Name: {name.common} {isVisited && "✅"}
        </h3>
        <img src={flags.png} alt="" />
      </div>
      <div>
        <p>Population: {population}</p>
        <p>Area: {area}</p>
      </div>
      <div>
        <button onClick={() => handleIsVisited(country)}>
          {isVisited ? "Visited" : "Visit"}
        </button>
        <p>
          {isVisited
            ? "I have visited this country"
            : "I am going to visit this country"}
        </p>
      </div>
    </div>
  );
};

export default Country;
