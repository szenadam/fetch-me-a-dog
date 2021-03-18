import React, { useEffect, useState } from 'react';

import './App.scss';
import Dog from './assets/dog.svg';
import Placeholder from './assets/placeholder_600x400.png';
import { debounce } from './Helpers';
import { GithubBadge } from './components/GithubBadge';

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

  /**
   * Fetch random dog image.
   */
  function handleFetchDog(): void {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response: Response) => response.json())
      .then((data: DogApiResponse) => {
        updateDogUrlList(oldList => {
          return [...oldList, data.message];
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  /**
   * Fetch previous dog url from the state.
   */
  function handlePreviousImg(): void {
    updateDogUrlList(oldList => {
      oldList.pop();
      return [...oldList];
    });
  }

  return (
    <div className={`wrapper${theme}`}>
      <div className="color-palette">
        <div className="theme-1" onClick={() => setTheme('')}>
          <div className='theme-item color-1'/>
          <div className='theme-item color-2'/>
          <div className='theme-item color-3'/>
          <div className='theme-item color-4'/>
        </div>

        <div className="theme-2" onClick={() => setTheme(' theme2')}>
          <div className='theme-item color-1'/>
          <div className='theme-item color-2'/>
          <div className='theme-item color-3'/>
          <div className='theme-item color-4'/>
        </div>
      </div>
      <a href="https://github.com/szenadam/fetch-me-a-dog" target="_blank" rel="noreferrer noopener">
        <GithubBadge theme={theme} />
      </a>
      <h1 className={`${theme}`}>Fetch me a Dog!</h1>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <section className="btns">
        <button className={`btn${theme}`} onClick={debounce(handleFetchDog, 200)}>
          Fetch!
        </button>
        <button
          className={`btn${theme}${dogUrlList.length === 1 ? ' hidden' : ''}`}
          disabled={dogUrlList.length <= 1}
          onClick={handlePreviousImg}
        >
          Previous
        </button>
      </section>
      <img src={lastDogPicUrl} alt="A cute dog" className="dog-image" />
    </div>
  );
}

export default App;
