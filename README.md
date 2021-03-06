# 🐶 Fetch me a Dog

[![Build Status](https://travis-ci.org/szenadam/fetch-me-a-dog.svg?branch=master)](https://travis-ci.org/szenadam/fetch-me-a-dog)

## Description

Fetch me a Dog! is a page where you can click a button, and you get a cute picture of a dog.
This project **was** bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the
[Dog API](https://dog.ceo/dog-api/).

## TODO

- Hamburger menu on mobile
- Redesign styles to be more user friendly (figma designs v2)
- Store theme in local storage
- Fix root div background color, so the whole view are has it when content is smaller than the screen view height.
- Add images to favorites and store them in local storage. Add favorites view. Should add react routing with this.
- Improve Accessibility.
- Store build commit hash somewhere on the page.

## Requirements

- Nodejs >= 12.14.1 (npm >= 6.13.6)
- Visual Studio Code

## Setup

`npm install`

## Available Scripts

- `npm start` Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test` Launches the test runner in the interactive watch mode.
- `npm build` Builds the app for production to the `build` folder.
- `npm eject` Eject the app to configure it more.

## Contributing

Any contributions are welcome.

## Changelog

- **0.6.1**
  - Fix previous button border radius
  - Fix GitHub badge on smaller devices
- **0.6.0**
  - Add themes
  - Register service worker
  - Fix some media query styles
  - Minor code refactor
- **0.5.0**
  - Add previous image functionality (remove redux, use React Hooks instead)
- **0.4.0**
  - Add redux for managing previous state
- **0.3.0**
  - Add responsive mobile view
- **0.2.0**
  - Setup Travis CI
  - Fetch dog picture from Dog API
  - Minor style/UI changes
- **0.1.0**
  - Add icons, assets
  - Add html elements
  - Add styles according to the Figma design
  - Center everything vertically
