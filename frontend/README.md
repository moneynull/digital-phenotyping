
# Frontend

This folder contains all the front-end React code.

  

## Preparation

  

1. Install **[Node.js](https://nodejs.org/en/)**
2. Install **[Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)** 

## How to run this project
1. Prepare the environment as above description.
2. Open **frontend** folder via terminal
3. run `yarn install` to install all required packages
4. run `yarn start` to run the program in development mode
5. press **ctrl + c** in the terminal to stop the program

## Source tree
  ```bash
  ├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json   
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── senpsi_header_logo.png
│   ├── src
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── loginBackground.png
│   │   │   └── senpsi_logo.png
│   │   ├── components
│   │   │   ├── InfoDetailsChart   #all components used in InfoDetailsPage
│   │   │   │   ├── AppUsageChart.tsx
│   │   │   │   ├── CallsTraceChart.tsx
│   │   │   │   ├── CallsUsageChart.tsx
│   │   │   │   ├── CategoryChart.tsx
│   │   │   │   ├── KeywordCloud.tsx
│   │   │   │   ├── LocationMap.tsx
│   │   │   │   ├── LocationNumberBarChart.tsx
│   │   │   │   ├── LocationNumberHeatMapChart.tsx
│   │   │   │   ├── ScreenUsageHeatMap.tsx
│   │   │   │   ├── SmsTraceChart.tsx
│   │   │   │   ├── SmsUsageChart.tsx
│   │   │   │   ├── TwitterHashtagBarchart.tsx
│   │   │   │   ├── TwitterHashtagChart.tsx
│   │   │   │   ├── TwitterTopicChart.tsx
│   │   │   │   ├── UnlockDurationChart.tsx
│   │   │   │   ├── UnlockTimesChart.tsx
│   │   │   │   └── UpdateInfo.tsx
│   │   │   └── common  #public components
│   │   │       ├── CardContainer.tsx
│   │   │       ├── ChartContainer.tsx
│   │   │       ├── ChartDataWrapper.tsx
│   │   │       ├── DateRangeSelector.tsx
│   │   │       ├── InfoSumCard.tsx
│   │   │       ├── Logger.ts
│   │   │       ├── NameAvatar.tsx
│   │   │       ├── NavTitle.tsx
│   │   │       ├── RowFlexContainer.tsx
│   │   │       ├── SearchBar.tsx
│   │   │       └── SectionTitle.tsx
│   │   ├── constant
│   │   │   ├── Colors.ts
│   │   │   ├── Endpoint.ts
│   │   │   └── index.d.ts
│   │   ├── global.d.ts
│   │   ├── index.tsx
│   │   ├── pages
│   │   │   ├── AddClientPage
│   │   │   │   └── AddClientPage.tsx
│   │   │   ├── Homepage
│   │   │   │   └── Homepage.tsx
│   │   │   ├── InfoDetailsPage
│   │   │   │   └── InfoDetailsPage.tsx
│   │   │   └── Login
│   │   │       └── Loginpage.tsx
│   │   ├── reportWebVitals.ts
│   │   ├── setupTests.ts
│   │   ├── styles
│   │   │   ├── componentsStyles.css
│   │   │   └── styles.css
│   │   ├── testing
│   │   │   ├── AddClientPage.test.tsx
│   │   │   ├── App.test.tsx
│   │   │   ├── Homepage.test.tsx
│   │   │   ├── InfoDetailsPage.test.tsx
│   │   │   ├── Loginpage.test.tsx
│   │   │   └── __snapshots__
│   │   │       └── App.test.tsx.snap
│   │   └── utils
│   │       └── testUtils.tsx
│   ├── tsconfig.json
│   ├── yarn-error.log
│   └── yarn.lock 
  ```

## Available Scripts

  

In the project directory, you can run:

  

### `yarn start`

  

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

  

### `yarn test`

  

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `yarn build`

  

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

### `yarn eject`

  

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

  

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

  

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

  

## Learn More

  

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

  

To learn React, check out the [React documentation](https://reactjs.org/).

  

### Code Splitting

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

  

### Analyzing the Bundle Size

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

  

### Making a Progressive Web App

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

  

### Advanced Configuration

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

  

### Deployment

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

  