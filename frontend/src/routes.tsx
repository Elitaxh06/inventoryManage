import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home'
import CreateProductForm from './Pages/Inventory/CreateProductForm'

const router = createBrowserRouter([
  {path: '/',  element: <Home /> },
  {path: '/create-product', element: <CreateProductForm />}
])

export default function Routes() {
  return <RouterProvider router={router} />
}
