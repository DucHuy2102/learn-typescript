// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/export.ts';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
);
