import React, { useState, useEffect } from "react";
import './Weather.css';
// import MapComponent from "../MapComponent";
import { formatDate } from "../Utils/Utils";
import FutureWeather from "./FutureWeather/FutureWeather";
import HourDetails from "./HourDetails/HourDetails";

function Weather({ weather }) {
    var wrapperClass = 'weather-wrapper';
    const [dayComponents, setDayComponents] = useState([]);
    const iconUrl = weather.current.condition.icon;

    if (weather.current.is_day === 1)
        wrapperClass = 'weather-wrapper';
    else
        wrapperClass = 'weather-wrapper-night';

    const changeDayDetails = day => {
        const dayDetails = weather.forecast.forecastday.filter(item => formatDate(item.date) === day)[0];
        setDayComponents(
            dayDetails.hour.map(
                hour => <HourDetails hour={hour} mintemp={dayDetails.day.mintemp_c} maxtemp={dayDetails.day.maxtemp_c}/>
            )
        );
    }

    const futureWeatherList = weather.forecast.forecastday.map(
        item => <FutureWeather weather={item} onDayClick={changeDayDetails}></FutureWeather>
    );

    useEffect(() => {
        changeDayDetails(formatDate(weather.location.localtime));
    }, [weather]);
    
    return (
        <div className={wrapperClass}>
            <div className='header-wrapper'>
                <div className='city-wrapper'>
                    <div className='city'>{weather.location.name},</div>
                    <div className='country'>{weather.location.country}</div>
                </div>
                <div className='time'>{formatDate(weather.location.localtime)}</div>
            </div>

            <div className='weather-card'>
                <div className='weather-row'>
                    <div className='weather-column'>
                        <div className='weather'>
                            <img className='weather-icon' src={iconUrl} alt='Icon'></img>
                            {Math.trunc(weather.current.temp_c) + '°C'}
                        </div>
                        <div className='weather-condition'>
                            {weather.current.condition.text}
                        </div>
                    </div>
                    <div className='more-info'>
                        <div><p>Feels like:</p> {weather.current.feelslike_c}°C</div>
                        <div><p>Humidity:</p> {weather.current.humidity}%</div>
                        <div><p>Wind:</p> {weather.current.wind_kph}kph</div>
                        <div><p>Precipitation:</p> {weather.current.precip_mm}mm</div>
                        <div><p>UV:</p> {weather.current.uv}</div>
                    </div>
                </div>
                <div className='fut-weather-wrapper'>
                    {futureWeatherList}
                </div>
                <div className='day-details-wrapper'>
                    {dayComponents}
                </div>
                {/* <MapComponent lon={weather.location.lon} lat={weather.location.lat}/> */}
            </div>
        </div>

    );
}
export default Weather;