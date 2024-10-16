import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import AuthProvider from './components/AuthProvider';

import App from './App';
import { store } from 'store';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ReduxProvider store={store}>
      <BrowserRouter>
          <AuthProvider>
              <App />
          </AuthProvider>
      </BrowserRouter>
    </ReduxProvider>
);

serviceWorkerRegistration.unregister();