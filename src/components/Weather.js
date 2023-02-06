import React, { useState } from "react"

import WeatherDisplay from "./WeatherDisplay"
import CityList from "./CityList"

const cities = ["Ottawa", "Moscow", "Tokyo"]

const Weather = () => {
  const [selectedCity, setSelectedCity] = useState("Ottawa");

  return (
    <div>
     <CityList items={cities} selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      <WeatherDisplay selectedCity={selectedCity} />
    </div>
  )

}

export default Weather
