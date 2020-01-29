import React from 'react';
import ReactDOM from 'react-dom';
import MainGUI from './components/MainGUI';
import 'normalize.css/normalize.css';
import './styles/styles.scss';


let appRoot = document.getElementById("app");

let template = (<MainGUI />);
ReactDOM.render(template, appRoot);
