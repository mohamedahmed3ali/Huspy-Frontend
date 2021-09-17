import React, { useEffect, useState } from 'react';
import './Search.css';


function Search({onCitySelect}) {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [SearchInput, setSearchInput] = useState('');
  
    // const fetchCities = async () => {
    //   const response = await fetch('http://localhost:8000/cities/');
    //   setCities(await response.json());
    //   console.log('Cities Loaded!');
    // };
    // const [data,setData]=useState([]);
  const fetchCities=()=>{
    fetch('/cityList.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setCities(myJson)
        console.log("cities",cities);
      });
  }

    const onCitySelected = e => {
        console.log(e.target.getAttribute('data-value'));
        onCitySelect(e.target.getAttribute('data-value'));
        setSearchInput('');
    }
  
    useEffect(() => {
        fetchCities();
    }, []);

    var currentFocus = -1;
    const onSearchChange = e => {
        //Change Search variable
        setSearchInput(e.target.value);

        //Base Cases
        if(e.target.value.length < 1){
            setAutoCompleteList([]);
            return;
        }
        if(cities.length === 0){
            setAutoCompleteList([]);
            return;
        }

        //Filter based on the search input.
        setFilteredCities(cities.filter(city=>city.Name.substring(0,e.target.value.length).toUpperCase() === e.target.value.toUpperCase()));

        currentFocus = -1;
        if(filteredCities.length > 0){
            var tempList = []
            for (let i = 0; i < filteredCities.length && i < 5; i++) {
                const autoCompleteitem = (<div key = {filteredCities[i].Id} onClick = {onCitySelected} data-value={filteredCities[i].Name}>
                    <strong>{e.target.value}</strong>
                    {filteredCities[i].Name.substring(e.target.value.length)}
                    ,
                    {filteredCities[i].Country}
                    </div>);
                tempList.push(autoCompleteitem);
            }
            setAutoCompleteList(tempList);
        }
    }

    const onSearchKeyDown = e => {
        var x = document.getElementById("autocomplete-list");
        //Base Case
        if(!autoCompleteList || autoCompleteList.length === 0)return;

        if (e.keyCode === 40) {//Arrow down
            currentFocus++;
            addActive(x);
        }
        else if (e.keyCode === 38) { //Arrow up
            e.preventDefault();
            currentFocus--;
            addActive(x);
        } else if (e.keyCode === 13) {//Enter
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x.children[currentFocus].click();
            }
        }
    };
    const addActive = x => {
        if (!x || !x.children) return false;
        removeActive(x);
        if (currentFocus >= x.children.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.children.length - 1);
        x.children[currentFocus].classList.add("autocomplete-active");
    }

    const removeActive = x => {
        for (var i = 0; i < x.children.length; i++) {
            x.children[i].classList.remove("autocomplete-active");
        }
    }

    const closeAllLists = elmnt => {
        var x = document.getElementById("autocomplete-list");
        var y = document.getElementsByClassName("search-input");
        if(elmnt !== y[0] && elmnt !== x)
            setAutoCompleteList([])
    }
    /*execute a function when someone clicks in the document:*/
    const closeAll = e => {
        closeAllLists(e.target);
        e.stopPropagation(); 
    };

    const onCityListHover = e =>{
        var x = document.getElementById("autocomplete-list");
        currentFocus = -1;
        removeActive(x);
        console.log('here');
    }

    return(
        <div className='search-wrapper' onClick = {closeAll}>
            <input type="text" className='search-input' onFocus= {onSearchChange} onChange= {onSearchChange} value = {SearchInput} onKeyDown = {onSearchKeyDown} placeholder = "Enter a city to get the Weather forecast"/>
            <div id = 'autocomplete-list' className = 'autocomplete-items' onMouseOver = {onCityListHover}> 
            {autoCompleteList}
            </div>
        </div>
    );  
}

export default Search;