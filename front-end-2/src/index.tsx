import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Footer from './components/footer'
import Header from './components/header'
import reportWebVitals from './reportWebVitals';
import Navigation from './components/navigation';


ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Navigation />
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();