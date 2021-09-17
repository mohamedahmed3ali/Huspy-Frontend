import React from "react";
import './HourDetails.css';
import { getTime } from "../../Utils/Utils";

function HourDetails({hour, mintemp, maxtemp}){
    const iconUrl = hour.condition.icon;
    const paddingBottomVal = ((hour.temp_c - mintemp)/(maxtemp - mintemp)) * 180;
    const paddingBottomString = {'padding-bottom':paddingBottomVal+'px'};
    return(
        <div className='hour-card'>
            <div className='hour'>{getTime(hour.time)}</div>
            <div className='hour-icon-temp' style={paddingBottomString}>
                <img className = 'hour-weather-icon' src={iconUrl} alt='Icon'></img>
                <div className = 'hour-temp'>
                    {Math.trunc(hour.temp_c) + '°C'}
                </div>
            </div>
            
            <div className='hour-weather-condition'>
                {hour.condition.text}
            </div>
        </div>
    );
}
export default HourDetails