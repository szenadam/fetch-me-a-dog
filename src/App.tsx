import React, { useState, useEffect } from 'react';
import './App.scss';
import Dog from './assets/dog.svg';
import GithubCornerBadge from './assets/github-corner-right.svg';

interface DogApiResponse {
  message: string;
  status: string;
}

function App() {
  const [dogUrlList, updateDogUrlList] = useState(['https://via.placeholder.com/600x400']);
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
        <img className="github-badge-right" src={GithubCornerBadge} alt="GitHub repository page" />
      </a>
      <h1>Fetch me a Dog!</h1>
      <div className="theme-1">
        <div className="theme-item item-1"></div>
        <div className="theme-item item-2"></div>
        <div className="theme-item item-3"></div>
        <div className="theme-item item-4"></div>
      </div>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <button className="btn" onClick={debounce(handleFetchDog, 200)}>
        Fetch!
      </button>
      <button className={"prev-btn" + (dogUrlList.length === 1 ? ' hidden' : '')} disabled={dogUrlList.length <= 1} onClick={handlePreviousImg}>
        Previous
      </button>
      <img src={lastDogPicUrl} alt="A cute dog" className="dog-image" />
    </div>
  );
}

export default App;
