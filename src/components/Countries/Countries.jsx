import { useEffect } from "react";
import { useState } from "react";
import Country from "../Country/Country";
import styles from "./Countries.module.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [visitedCountries, setVisitedCountries] = useState([]);

  // handle visited countries
  const handleVisitedCountries = (country) => {
    const newVisited = [...visitedCountries, country];
    setVisitedCountries(newVisited);
  };

  // delete from visited country
  const handleDeleteVisitedCountry = (uniqueId) => {
    console.log(uniqueId);
    const deleteVisitedCountry = visitedCountries.filter(country => country.cca3 !== uniqueId)
    setVisitedCountries(deleteVisitedCountry)
  }

  // fetch countries
  useEffect(() => {
    (async () => {
      const countriesJson = await fetch("https://restcountries.com/v3.1/all");
      const countries = await countriesJson.json();
      setCountries(countries);
    })();
  }, []);

  return (
    <div>
      <h3>Countries {countries.length}</h3>

      <div className={styles.country__container}>
        {/* all countries */}
        <div className={styles.countries}>
          {countries.map((country) => {
            if (country.name.common !== "Israel") {
              return (
                <Country
                  key={country.cca3}
                  country={country}
                  handleVisitedCountries={handleVisitedCountries}
                />
              );
            }
          })}
        </div>
        {/* visited countries */}
        <div className={styles.visited__countries}>
          {visitedCountries.length > 0 ? (
            <>
              <h3>Visited Countries: {visitedCountries.length}</h3>
              <ul>
                {visitedCountries.map((visitedCountry) => (
                  <li key={visitedCountry.cca3}>
                    {visitedCountry.name.common}
                    <button onClick={() => handleDeleteVisitedCountry(visitedCountry.cca3)} className={styles.delete__country}>❎</button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3 className={styles.default__message}>
              You havn&apos;t visited any country yet
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Countries;
