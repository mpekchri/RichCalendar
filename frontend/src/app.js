import React from 'react';
import ReactDOM from 'react-dom';
import MainGUI from './components/MainGUI';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

import {Provider} from 'mobx-react';
import {setupStore} from './setup';
import { onSnapshot } from 'mobx-state-tree';


let appRoot = document.getElementById("app");

// let template = (<MainGUI />);
let template = (
    <Provider mainStore = {setupStore(false)} >
        <MainGUI />
    </Provider>
);
ReactDOM.render(template, appRoot);
