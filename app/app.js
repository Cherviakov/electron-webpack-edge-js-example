import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

const mainElement = document.createElement('div');
mainElement.style.minHeight = '100%';
document.body.appendChild(mainElement);

render(<App />, mainElement);
