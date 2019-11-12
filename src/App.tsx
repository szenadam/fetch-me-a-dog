import React, { useState, useEffect } from 'react';
import './App.scss';
import Dog from './assets/dog.svg';

interface DogApiResponse {
  message: string;
  status: string;
}

function App() {

  const [dogUrl, setDogUrl] = useState("https://via.placeholder.com/600x400");

  useEffect(() => {
    handleFetchDog();
  }, [])

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

  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: any;
  
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout)
        }
  
        timeout = setTimeout(() => resolve(func(...args)), waitFor)
      })
  }
  
  return (
    <div className="wrapper">
      <h1>Fetch me a Dog!</h1>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <button className="btn" onClick={debounce(handleFetchDog, 200)}>
        Fetch!
      </button>
      <img src={dogUrl} alt="A cute dog" className="dog-image" />
    </div>
    
  );
}

export default App;
