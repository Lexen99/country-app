import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./CountryPage.css";
import { useDarkMode } from '../components/DarkModeTheme';

const CountryPage = () => {
  const navigate = useNavigate();
  const countryArr = useLoaderData();
  const { isDarkMode } = useDarkMode()
  console.log(countryArr);

  const handleGoBack = () => {
    navigate("/");
  };

  const handleBorderCountryClick = ((border) => navigate(`/${border}`)) // kunna navigera till länder via border

  if (countryArr.length > 0) {
    const country = countryArr[0];
    const {
      name,
      flags,
      population,
      region,
      capital,
      languages,
      currencies,
      borders,
    } = country;

    return (
      <div>
        <Navbar />
        <div className={`country-page ${isDarkMode ? "dark-mode" : ""}`}>
          <div className="png-button-container">
            <button onClick={handleGoBack} className={`back-button ${isDarkMode ? "dark-mode" : ""}`}>
              <span className="arrow">&#8592;</span>{" "}
              <span className="text">Back</span>
            </button>
            <img src={flags.png} alt="" className="singel-flagga" />
          </div>

          <div className="information-container">
            <h1 className="countrypage-header">{name.common}</h1>
            <div className="deteails-container">
              <div className="left-container">
                <p id="countrypage-paragraphs">
                  <strong>Population:</strong>{" "}
                  {population.toLocaleString("en-US")}
                </p>
                <p id="countrypage-paragraphs">
                  <strong>Region:</strong> {region}
                </p>
                <p id="countrypage-paragraphs">
                  <strong>Capital:</strong> {capital}
                </p>
                <p id="countrypage-paragraphs">
                  <strong>Native name:</strong> {name.common}
                </p>
              </div>
              <div className="right-container">
                <p id="countrypage-paragraphs">
                  <strong>Currencies:</strong>{" "}
                  {currencies ? (
                    Object.keys(currencies).map((currencyCode, index) => (
                      <span key={index} className="currency">
                        {index > 0 && ', '}
                        {currencyCode}
                      </span>
                    ))
                  ) : (
                    <span>No currency information available</span>
                  )}
                </p>
                <p id="countrypage-paragraphs">
                  <strong>Language:</strong> {" "}
                  {languages ? (
                    Object.keys(languages).map((languageCode, index) => (
                      <span key={index} className="language">
                        {index > 0 && ', '}
                        {languageCode}
                      </span>
                    ))
                  ) : (
                    <span>No Language information available</span>
                  )}
                </p>
              </div>
            </div>
            <div className="border-contries-container">
              <p id="countrypage-paragraphs">
                <strong className="border-country-text" style={{ marginRight: 10 }}>Border Countries:</strong>
                {borders && borders.length > 0 ? (
                  borders.map((border, index) => (
                    <button key={index} className={`border-country ${isDarkMode ? "dark-mode" : ""}`} onClick={() => handleBorderCountryClick(border)}>
                      {border}
                    </button>
                  ))
                ) : (
                  <span> No border countries</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Tyvärr</p>;
  }
};

export const countryDeteailsLoader = async ({ params }) => {
  try {
    const { name } = params;
    console.log("country name:", name);
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${name}`
    );

    if (!res.ok) {
      throw new Error(`Couldn't load the country: ${name}.`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default CountryPage;