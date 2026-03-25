import { Plus, Edit, Trash2, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type ActionProps = {
  onAdd?: () => void
  onEdit?: () => void
  onDelete?: () => void
  title: string
  buttons: Array<{label: string; style: string; onClick?: () => void; icon: React.ReactNode}>
}

function ActionCard({title, buttons}: ActionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <Package className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {buttons.map((button) => (
          <button
            key={button.label}
            className={`${button.style} flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105`}
            type="button"
            onClick={button.onClick}
          >
            {button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function InventoryActions() {
  const navigate = useNavigate()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ActionCard
        title="Gestión de Productos"
        buttons={[
          {
            label: 'Agregar Producto',
            style: 'w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-sm',
            icon: <Plus className="w-4 h-4" />,
            onClick: () => navigate('/create-product')
          },
          {
            label: 'Editar Producto',
            style: 'w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm',
            icon: <Edit className="w-4 h-4" />
          },
          {
            label: 'Eliminar Producto',
            style: 'w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-sm',
            icon: <Trash2 className="w-4 h-4" />
          },
        ]}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Acciones Rápidas</h2>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Package className="w-4 h-4 text-yellow-600" />
            </div>
            <span className="font-medium text-gray-700">Ver Productos Bajos en Stock</span>
          </button>
          <button className="w-full flex items-center space-x-3 py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Package className="w-4 h-4 text-orange-600" />
            </div>
            <span className="font-medium text-gray-700">Generar Reporte de Inventario</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-teal-100 p-2 rounded-lg">
            <Package className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Estadísticas</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Valor Total del Inventario</span>
            <span className="font-semibold text-gray-900">$0.00</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Productos Activos</span>
            <span className="font-semibold text-gray-900">0</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Alertas de Stock</span>
            <span className="font-semibold text-red-600">0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
