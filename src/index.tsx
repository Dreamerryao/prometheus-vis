import ReactDOM from 'react-dom/client'
import "./styles/tailwind.css";
import "./styles/colors.css";
import 'antd/dist/antd.css';
import App from "./App";
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
