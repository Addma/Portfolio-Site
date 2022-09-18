import React from 'react';
import {createRoot} from 'react-dom/client'
import ReactDOM from 'react-dom';
import './index.css';
import App from './main';
document.body.onmousedown = e => {if (e.button === 1) return false; };
const container = document.getElementById('root')
const root = createRoot(container)
document.body.onkeydown = e => {
  /**
   * If users entering form data don't jump on spaces
   */
  if (document.activeElement.id === 'message' || document.activeElement.tagName.toLowerCase() === 'input'){
            return
  }
  e.preventDefault()
}
ReactDOM.render(<React.StrictMode><App/></React.StrictMode>, container);
/**ReactDOM.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>,
  container
);*/