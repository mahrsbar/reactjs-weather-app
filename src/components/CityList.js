import React from "react"
import "./CityList.scss"

const CityList = ({items, selectedCity, setSelectedCity}) => {

  return (
    <div className="cityListContainer">
      {items.map(city => (
        <button className={city === selectedCity ? 'cityListItem active' : 'cityListItem'}
        onClick={() => setSelectedCity(city)} key={city}>{city}</button>
        ))}
    </div>
  )
}

export default CityList
