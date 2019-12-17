import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import './App.scss';
import Dog from './assets/dog.svg';
import GithubCornerBadge from './assets/github-corner-right.svg';

interface DogApiResponse {
  message: string;
  status: string;
}

function picturePicker(state = { pics: ['https://via.placeholder.com/600x400'], currentPic: 'https://via.placeholder.com/600x400'}, action: any) {
  switch (action.type) {
    case 'NEWPIC':
      state.currentPic = action.payload;
      state.pics.push(action.payload);
      return { ...state }
    default:
      return state;
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}

let store = createStore(picturePicker, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {

  const [dogUrl, setDogUrl] = useState("https://via.placeholder.com/600x400");

  useEffect(() => {
    handleFetchDog();
  }, [])

  function handleFetchDog(): void {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response: Response) => response.json())
      .then((data: DogApiResponse) => {
        store.dispatch({type: 'NEWPIC', payload: data.message})
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
      <a href="https://github.com/szenadam/fetch-me-a-dog" target="_blank" rel='noreferrer noopener'>
        <img className="github-badge-right" src={GithubCornerBadge} alt="GitHub repository page"/>
      </a>
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
