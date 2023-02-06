import React, { useState, useEffect } from "react"
import axios from "axios"

import "./WeatherDisplay.scss"

const WeatherDisplay = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&mode=json&units=metric&APPID=${process.env.API_KEY}`
          ),
          axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&mode=json&units=metric&APPID=${process.env.API_KEY}`
          ),
        ])

        setWeatherData({
          currentWeather: currentWeatherResponse.data,
          forecast: forecastResponse.data,
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchWeatherData()
  }, [selectedCity])

  if (!weatherData) return <div>Loading...</div>

  const fourDayForecast = weatherData.forecast.list
    .filter(forecast => {
      const forecastTime = new Date(forecast.dt_txt)
      return forecastTime.getHours() === 15
    })
    .slice(0, 4);

  const formatDate = date =>
    date.toLocaleDateString("default", { weekday: "short" })

  return (
    <div className="weatherDisplay">
      <div className="currentWeather">
        <div className="currentWeatherTitle">
          Today
        </div>
        <div className="currentWeatherData">
          <div className="currentWeatherIcon">
          <img
              src={`http://openweathermap.org/img/wn/${weatherData.currentWeather.weather[0].icon}@4x.png`}
              alt={weatherData.currentWeather.weather[0].description}
            />
          </div>
          <div className="currentWeatherDetails">
            <span className="currentWeatherTemperature">
              {Math.round(weatherData.currentWeather.main.temp)}°
            </span>
            <p className="currentWeatherDescription">
              {weatherData.currentWeather.weather[0].description}
            </p>
           
          </div>
        </div>
      </div>
      <div className="forecast">
        <div className="forecastList">
          {fourDayForecast.map(forecast => (
            <div className="forecastListItem" key={forecast.dt}>
              <span className="forecastListItemDay">{formatDate(new Date(forecast.dt_txt))}</span>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
              />
              <span className="forecastListItemTemp">
                {Math.round(forecast.main.temp)}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay
