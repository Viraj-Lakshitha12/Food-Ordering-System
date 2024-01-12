// index.tsx
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './auth/store';
import App from './App';
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// import React from "react";
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
//
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// )
