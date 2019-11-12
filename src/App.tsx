import React, { useState } from 'react';
import './App.scss';
import Dog from './assets/dog.svg';

interface DogApiResponse {
  message: string;
  status: string;
}

function App() {

  const [dogUrl, setDogUrl] = useState("https://via.placeholder.com/600x400");

  function handleFetchDog(): void {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response: Response) => response.json())
      .then((data: DogApiResponse) => {
        setDogUrl(data.message);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  
  return (
    <div className="wrapper">
      <h1>Fetch me a Dog!</h1>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <button className="btn" onClick={handleFetchDog}>
        Fetch!
      </button>
      <img src={dogUrl} alt="A cute dog" className="dog-image" />
    </div>
  );
}

export default App;
