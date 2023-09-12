// import '../wdyr';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ErrorBoundary from './shared/utils/errorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
);
