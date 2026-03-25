import { Package, TrendingUp, BarChart3 } from 'lucide-react'

export default function InventoryHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-3 rounded-full">
          <Package className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-4xl text-black font-bold mb-2">Sistema de Inventario</h1>
      <p className="text-lg text-gray-600 mb-6">Gestión inteligente de productos y control de stock</p>

      <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Control de Ventas</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4" />
          <span>Reportes en Tiempo Real</span>
        </div>
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4" />
          <span>Gestión de Productos</span>
        </div>
      </div>
    </div>
  )
}
