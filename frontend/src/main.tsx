import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from './store/appStore.ts'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
       <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
