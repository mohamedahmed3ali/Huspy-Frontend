import React, { useState, useEffect } from "react";
import './FutureWeather.css';
import { formatDate } from "../../Utils/Utils";

function FutureWeather({weather, onDayClick, localDate}){

    const [futCardClass, setFutCardClass] = useState('fut-weather-column');
    const iconUrl = weather.day.condition.icon;
    
    //Sets weather date to date or "Today"
    var weatherDate;
    if(formatDate(weather.date) === localDate)
        weatherDate= "Today";
    else    
        weatherDate = formatDate(weather.date);

    //Handles onclick event of day wrapper
    const onDayClicked = () =>{
        onDayClick(formatDate(weather.date));
        clearAllPointers();
        setFutCardClass(futCardClass + ' fut-pointer');
    }

    //Removes the pointer from all days
    const clearAllPointers = () => {
        const elements = document.getElementsByClassName('fut-weather-column');
        for (let i = 0; i < elements.length; i++)
            elements[i].classList.remove('fut-pointer');
    }

    //On weather change, sets pointer to today
    useEffect(() => {
        if(formatDate(weather.date) === localDate)
            onDayClicked();
    }, [weather]);

    
    return(
        <div className={futCardClass} onClick={onDayClicked}>
            <div>{weatherDate}</div>
            <div className = 'fut-weather'> 
                <img className = 'fut-weather-icon' src={iconUrl} alt='Icon'></img>
                <div className = 'min-max-temp'>
                <b>{Math.trunc(weather.day.maxtemp_c) + '°C'}</b>
                {Math.trunc(weather.day.mintemp_c) + '°C'}
                </div>
            </div>
            <div className='fut-weather-condition'>
                {weather.day.condition.text}
            </div>
        </div>
    );
}
export default FutureWeather