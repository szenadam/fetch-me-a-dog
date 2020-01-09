import React, { useState, useEffect } from 'react';

import './App.scss';
import Dog from './assets/dog.svg';
import Placeholder from './assets/placeholder_600x400.png';
import { debounce } from './Helpers';
import { GithubBadge } from './GithubBadge';


interface DogApiResponse {
  message: string;
  status: string;
}


function App() {
  const [dogUrlList, updateDogUrlList] = useState([Placeholder]);
  const [theme, setTheme] = useState<string>('');
  let lastDogPicUrl: string | undefined = dogUrlList[dogUrlList.length - 1];

  useEffect(() => {
    handleFetchDog();
  }, []);

  function handleFetchDog(): void {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response: Response) => response.json())
      .then((data: DogApiResponse) => {
        updateDogUrlList(oldList => {
          const newList = [...oldList, data.message];
          return newList;
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  function handlePreviousImg(): void {
    updateDogUrlList(oldList => {
      oldList.pop();
      return [...oldList];
    });
  }

  return (
    <div className={`wrapper${theme}`}>
      <a href="https://github.com/szenadam/fetch-me-a-dog" target="_blank" rel="noreferrer noopener">
        <GithubBadge theme={theme} />
      </a>
      <h1 className={`${theme}`}>Fetch me a Dog!</h1>
      <div className="color-palette">
        <div className="theme-1" onClick={() => setTheme('')}>
          <div className="theme-item item-1"></div>
          <div className="theme-item item-2"></div>
          <div className="theme-item item-3"></div>
          <div className="theme-item item-4"></div>
        </div>

        <div className="theme-2" onClick={() => setTheme(' theme2')}>
          <div className="theme-item item-1"></div>
          <div className="theme-item item-2"></div>
          <div className="theme-item item-3"></div>
          <div className="theme-item item-4"></div>
        </div>
      </div>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <button className={`btn${theme}`} onClick={debounce(handleFetchDog, 200)}>
        Fetch!
      </button>
      <button
        className={`prev-btn${theme}${dogUrlList.length === 1 ? ' hidden' : ''}`}
        disabled={dogUrlList.length <= 1}
        onClick={handlePreviousImg}
      >
        Previous
      </button>
      <img src={lastDogPicUrl} alt="A cute dog" className="dog-image" />
    </div>
  );
}

export default App;
