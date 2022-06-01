import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './reset.css';
import './style.scss';
import App from './App.js';
import store from './store/store.js'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
