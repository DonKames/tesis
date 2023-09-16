import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './modules/store/store';
import { AppRouter } from './modules/routers/AppRouter';
import 'animate.css';
import './styles/globalStyles.css';

export const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>
    );
};
