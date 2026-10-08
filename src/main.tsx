import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Layout from './Layout.tsx'
import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MeusLances from './MeusLances.tsx'
import CadCliente from './CadCliente.tsx'

// ----------------- Rotas de Admin
import AdminLayout from './admin/AdminLayout.tsx'
import AdminLogin from './admin/AdminLogin.tsx'
import AdminDashboard from './admin/AdminDashboard.tsx'
import AdminSmartphones from './admin/AdminSmartphones.tsx'
import AdminNovoSmartphone from './admin/AdminNovoSmartphone.tsx'
import AdminLances from './admin/AdminLances.tsx'
import AdminNovoLeilao from './admin/AdminNovoLeilao.tsx'
import AdminClientes from './admin/AdminClientes.tsx'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "smartphones", element: <AdminSmartphones /> },
      { path: "smartphones/novo", element: <AdminNovoSmartphone /> },
      { path: "lances", element: <AdminLances /> },
      { path: "leiloes/novo/:smartphoneId", element: <AdminNovoLeilao />},
      { path: "clientes", element: <AdminClientes /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:smartphoneId', element: <Detalhes /> },
      { path: 'meusLances', element: <MeusLances /> },
      { path: 'cadCliente', element: <CadCliente /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)