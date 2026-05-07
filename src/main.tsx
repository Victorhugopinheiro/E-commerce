
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { Bounce, ToastContainer } from 'react-toastify'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10,   // 10 minutos (antes era cacheTime)
    },
  },
})

createRoot(document.getElementById('root')!).render(

  <QueryClientProvider client={queryClient}>

    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <BrowserRouter>
        <AuthProvider>
          <ShopProvider>
            <App />
          </ShopProvider>

        </AuthProvider>
      </BrowserRouter>,
    </>

  </QueryClientProvider>
)
