import React from "react";
import './SearchHistory.css';
import { isToday } from "../Utils/Utils";

function SearchHistory({history,onHistoryClick}){
    const iconUrl = history.Icon;

    //Sets background depending on whether it is a day or night
    var history_card_class;
    if(history.IsDay)
        history_card_class = 'history-card';
    else
        history_card_class = 'history-card-night';

    //Sets date to date or today
    var historyDate;
    if(isToday(history.SearchDate, true))
        historyDate= "Today";
    else    
        historyDate = history.SearchDate;

    //Handles the onclick event of History
    const onHistoryClicked = () => {
        onHistoryClick(history.CityName);
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }

    return(
        <div className={history_card_class} onClick={onHistoryClicked}>
            <div className='history-city'>
                {history.CityName}
            </div>
            <div className = 'history'> 
                <img className = 'fut-weather-icon' src={iconUrl} alt='Icon'></img>
                <div className = 'history-temp'>
                    {history.Temperature}
                </div>
            </div>
            <div>{historyDate} {history.SearchTime}</div>
        </div>
        
    );
}
export default SearchHistory