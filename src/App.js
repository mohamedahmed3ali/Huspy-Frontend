import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './Weather/Weather';
import Search from './Search/Search';
import SearchHistory from './SearchHistory/SearchHistory';
import { formatDate, getTime, getNowDateString } from './Utils/Utils';

function App() {
  // const api_id = '69f297510fa6402634f511067bf77995';
  const api_id = '291a7f7f1af24ab9841173327211409';
  const [weather, setWeather] = useState();
  const [searchHistory, setSearchHistory] = useState();

  const fetchWeather = async (name) => {
    if(!name)return;
    console.log("name",name);
    // const api_url = 'https://api.openweathermap.org/data/2.5/weather?id='+id+'&appid=' + api_id + '&units=metric';
    const api_url = 'https://api.weatherapi.com/v1/forecast.json?key='+api_id+'&q='+name+'&days=10&aqi=no&alerts=no'
    const response = await fetch(api_url);
    const data = await response.json();
    console.log("data",data);
    setWeather(<Weather weather = {data} />);
    //Add Search History
    addSearchHistory(data);  
  };

  const addSearchHistory = async(weather) => {
    const history = {
      CityName: weather.location.name,
      Temperature: Math.trunc(weather.current.temp_c) + '°C' ,
      Icon: weather.current.condition.icon,
      TempCondition: weather.current.condition.text,
      SearchDate: formatDate(getNowDateString()),
      SearchTime: getTime(getNowDateString()),
      IsDay: weather.current.is_day
    }
    const api_url = 'http://localhost:8000/addSearchHistory/';
    
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(history)
    };
    const response = await fetch(api_url, requestOptions);
    const data = await response.json();
    console.log("Search History Response:", data);
    fetchSearchHistory();
  }

  const fetchSearchHistory = async () => {
    const api_url = 'http://localhost:8000/getSearchHistory/'
    const response = await fetch(api_url);
    const data = await response.json();
    console.log("data",data);
    const dataToUI = data.map(item => <SearchHistory history = {item} onHistoryClick={fetchWeather}/>);
    setSearchHistory(dataToUI);
  };

  useEffect(() => {
    // fetchWeather();
    fetchSearchHistory();
    console.log()
  }, []);

  const closeAll = e => {
    document.getElementsByClassName('search-wrapper')[0].click();
  }

  return (
    <div onClick = {closeAll}>
      <div className = "header">
        <img className = "logo" src='/huspy-logo.png' alt="Logo" />
        <img className = "icon" src='/weather-icon.png' alt="Logo" />
        <Search onCitySelect = {fetchWeather}/>
      </div>
      <div className="App">
        {weather}
        <div className = 'search-history'>
          <h1>
            Search History
          </h1>
          <div className = 'search-history-list'>
            {searchHistory}
          </div>
          
        </div>
      </div>
    </div>
    
  );
}

export default App;
