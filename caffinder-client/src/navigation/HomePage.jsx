import React, { useState, useEffect, useRef } from 'react';
import caffinderLogo from '../assets/caffinder-logo.png';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [ currentLocation, setCurrentLocation ] = useState('San Francisco, California');
  const address = useRef();
  const navigate = useNavigate();
  const [ loadingMessage, setLoadingMessage ] = useState();

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      console.log(longitude, latitude);
      setCurrentLocation([longitude, latitude]);
      fetchAndNavigate([longitude, latitude]);
    })
    displayLoadingMessage();
  };

  const searchAddress = () => {
    address.current.value = '';
    fetchAndNavigate(currentLocation);
    displayLoadingMessage();
  };

  const inputChange = (evt) => {
    setCurrentLocation(evt.target.value.trim());
  };

  const keyPressEnterSearch = (evt) => {
    if (currentLocation && evt.key === 'Enter') {
      searchAddress();
    }
  };
  
  const fetchAndNavigate = (location) => {
    if (currentLocation !== '') {
      console.log(location, 'to the next page!')
      navigate(`search_results/${location}`, {query: location})
    } else {
      console.log('no empty query allowed');
    }
  };

  const displayLoadingMessage = () => {
    setLoadingMessage(<p style={{color: 'lightgreen'}}>Searching...</p>);
  };

  return (
    <>
      <div className="App">
      <header className="App-header">
        <img src={caffinderLogo} className="App-logo" alt="logo" />
        <h1 style={{ fontFamily:'Abril_Fatface' }}>
          caffinder
        </h1>
        {loadingMessage}
        <Button onClick={getCurrentLocation} 
          customWidth={'70vw'} customText={'Use Current Location'}/>
        <div style={{marginTop: 20}} >
          <input 
            onKeyDown={keyPressEnterSearch}
            onChange={inputChange}
            ref={address}
            placeholder='Enter Address'
            style={{ padding: 20, borderRadius: 10, width: '44vw', textAlign: 'center', }} 
          />
          <Button onClick={searchAddress} customWidth={'17vw'} customText={'Search'} color={'black'} textColor={'white'} />
        </div>
      </header>
    </div>
    </>
  );
};



