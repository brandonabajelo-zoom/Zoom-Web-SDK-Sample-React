# Zoom-Web-SDK-Sample-React

React sample application bootstrapped with [Create React App](https://github.com/facebook/create-react-app) which utilizes the [Zoom Web SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web) to start and join meetings and webinars. This project utilizes modern ES6 syntax and concepts so if you are unfamiliar with that, please review the official [Javscript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript) first.

## Installation

`$ git clone https://github.com/brandonabajelo-zoom/Zoom-Web-SDK-Sample-React.git`

## Setup

1. Enter project directory

`$ cd Zoom-Web-SDK-Sample-React`

2. Install project dependencies

 `$ npm install` or `$ yarn install` (recommended)

3. In the root directory of the project, create a `.env` file where you will store your relevant keys and variables. This file should also be added to your `.gitignore` file so your keys are not exposed to github

`$ touch .env`

4. Inside this `.env` file, provide the following keys. Using this file will allow us to access these variables in our code via nodes `process.env.KEY_NAME` object

`REACT_APP_ZOOM_API_KEY=xxxxx` [Api Key Generation](https://marketplace.zoom.us/develop/create)

`REACT_APP_SIGNATURE_ENDPOINT=xxxxx` [Signature Generation](https://github.com/zoom/websdk-sample-signature-node.js)

`REACT_APP_LEAVE_URL=xxxxxx` (ex: localhost:300)

`REACT_APP_USERNAME=xxxxxx` (ex: brandon)

5. Once your `.env` is configured properly, run the app and navigate to your browser [http://localhost:3000](http://localhost:3000)

`$ npm start` or `$ yarn start`

## Usage

6. You should see a `Web Meeting` button in the top right corner where you will be able to enter your Zoom Meeting information

If you've entered your credentials and meeting information correctly, your browser will start utilizing the Zoom Web SDK! Congrats!
