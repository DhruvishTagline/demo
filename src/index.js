import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store';

import 'react-toastify/dist/ReactToastify.css';
import { routes } from './routing/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(routes)

root.render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </>
);

