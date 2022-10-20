import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RootStoreProvider} from "./app/stores/StoreProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RootStoreProvider>
          <App/>
      </RootStoreProvider>
  </React.StrictMode>
);

reportWebVitals();
