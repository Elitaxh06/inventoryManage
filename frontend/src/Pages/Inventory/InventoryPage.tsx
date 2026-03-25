import InventoryHeader from './InventoryHeader'
import InventoryActions from './InventoryActions'
import InventoryTable from './InventoryTable'

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InventoryHeader />
        <div className="mt-8 space-y-8">
          <InventoryActions />
          <InventoryTable />
        </div>
      </div>
    </div>
  )
}
