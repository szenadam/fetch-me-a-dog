import React, { useState, useEffect } from 'react';
import './App.scss';
import Dog from './assets/dog.svg';

interface DogApiResponse {
  message: string;
  status: string;
}

interface GithubBadgeProps {
  backgroundFill: string;
  octoFill: string;
}

function GithubBadge(props: GithubBadgeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 250 250"
      fill={props.backgroundFill}
      className='github-badge'
      style={{position: 'absolute', top: 0, right: 0}}
    >
      <path d="M0 0l115 115h15l12 27 108 108V0z" fill={props.octoFill} />
      <path
        className="octo-arm"
        d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"
        style={{WebkitTransformOrigin: '130px 106px', transformOrigin: "130px 106px"}}
      />
      <path
        className="octo-body"
        d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"
      />
    </svg>
  );
}

function App() {
  const [dogUrlList, updateDogUrlList] = useState(['https://via.placeholder.com/600x400']);
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

  const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeout: any;
    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
      new Promise(resolve => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
      });
  };

  return (
    <div className="wrapper">
      <a href="https://github.com/szenadam/fetch-me-a-dog" target="_blank" rel="noreferrer noopener">
        <GithubBadge backgroundFill='#f9f6e7' octoFill='#39566e' />
      </a>
      <h1>Fetch me a Dog!</h1>
      <div className="color-palette">
        <div className="theme-1" onClick={() => setTheme('')}>
          <div className="theme-item item-1"></div>
          <div className="theme-item item-2"></div>
          <div className="theme-item item-3"></div>
          <div className="theme-item item-4"></div>
        </div>

        <div className="theme-2" onClick={() => setTheme('theme2')}>
          <div className="theme-item item-1"></div>
          <div className="theme-item item-2"></div>
          <div className="theme-item item-3"></div>
          <div className="theme-item item-4"></div>
        </div>
      </div>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <button className={`btn ${theme}`} onClick={debounce(handleFetchDog, 200)}>
        Fetch!
      </button>
      <button
        className={`prev-btn ${dogUrlList.length === 1 ? ' hidden' : ''} ${theme}`}
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
