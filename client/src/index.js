import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from './app/store/store';
import App from './app/App';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
const store = setupStore();

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
