import { deleteProduct, readProducts } from "../../service/Product"
import type { Product } from "../../types/products.type";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Package, AlertTriangle, CheckCircle, Edit3, Trash2 } from 'lucide-react';
import Swal from "sweetalert2";

export default function InventoryTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'low-stock'>('all')
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all')

  const initialData = async () => {
    try{  
      const data = await readProducts()
      setProducts(data?.datos ?? [])
      setLoading(false)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    initialData()
  }, [])

  // Filtros aplicados
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStock = stockFilter === 'all' ||
                          (stockFilter === 'in-stock' && product.stock > product.stock_minimo) ||
                          (stockFilter === 'low-stock' && product.stock <= product.stock_minimo)
      
      const matchesCategory = categoryFilter === 'all' || product.categoria_productos_id === categoryFilter
      
      return matchesSearch && matchesStock && matchesCategory
    })
  }, [products, searchTerm, stockFilter, categoryFilter])


  const handleEditProduct = () => {
    Swal.fire({
      icon:"info",
      titleText: "Para su información",
      text: "Esta funcion no esta disponible de momento"
    })
  }

  const handleDeleteProduct = async(id:number) => {
      const result = await deleteProduct(id)
      if(result){
          Swal.fire({
              icon:"success",
              titleText: "Para su información",
              text: result.resultadoTexto
          })
          initialData()
      }
  }

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.categoria_productos_id))]
    return uniqueCategories.sort((a, b) => a - b)
  }, [products])

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Cargando productos...</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6 lg:p-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventario de Productos</h1>
          <p className="text-gray-600">Gestiona y visualiza todos tus productos</p>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Productos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{products?.length || 0}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">En Stock</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{products?.filter(p => p.stock > p.stock_minimo).length || 0}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Bajo Stock</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{products?.filter(p => p.stock <= p.stock_minimo).length || 0}</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-4 md:p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros de Búsqueda</h2>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Stock Filter */}
          <div>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as 'all' | 'in-stock' | 'low-stock')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="all">Todos los productos</option>
              <option value="in-stock">En stock</option>
              <option value="low-stock">Bajo stock</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(categoryId => (
                <option key={categoryId} value={categoryId}>Categoría {categoryId}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
          <span>Mostrando {filteredProducts.length} de {products.length} productos</span>
          {(searchTerm || stockFilter !== 'all' || categoryFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setStockFilter('all')
                setCategoryFilter('all')
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Products List - Responsive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProducts?.map((product) => (
          <div key={product.producto_id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
            
            {/* Card Header - Status and Title */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">{product.nombre}</h3>
                  <p className="text-xs text-gray-500 mt-1">ID: {product.producto_id}</p>
                </div>
                <div className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  product.stock > product.stock_minimo
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.stock > product.stock_minimo ? 'En Stock' : 'Bajo Stock'}
                </div>
              </div>
              {product.descripcion && (
                <p className="text-xs text-gray-600 line-clamp-2">{product.descripcion}</p>
              )}
            </div>

            {/* Card Body - Info Grid */}
            <div className="p-4 flex-1">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-medium uppercase">Precio</p>
                  <p className="text-lg font-bold text-indigo-600 mt-1">${product.precio}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-medium uppercase">Stock</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{product.stock}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-medium uppercase">Mínimo</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{product.stock_minimo}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      product.stock > product.stock_minimo ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{
                      width: `${Math.min((product.stock / (product.stock_minimo * 2)) * 100, 100)}%`
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">Nivel de stock</p>
              </div>

              {/* Categoría */}
              <div className="text-center">
                <p className="text-xs text-gray-500 font-medium uppercase">Categoría</p>
                <p className="text-sm text-gray-700 mt-1">ID: {product.categoria_productos_id}</p>
              </div>
            </div>

            {/* Card Footer - Actions */}
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => handleEditProduct()}
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition font-medium text-sm"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDeleteProduct(product.producto_id)}
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition font-medium text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span>Borrar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts?.length === 0 && products.length > 0 && (
        <div className="text-center py-12 col-span-full">
          <Filter className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
          <p className="mt-1 text-sm text-gray-500">
            No hay productos que coincidan con los filtros aplicados.
            <button
              onClick={() => {
                setSearchTerm('')
                setStockFilter('all')
                setCategoryFilter('all')
              }}
              className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Limpiar filtros
            </button>
          </p>
        </div>
      )}

      {/* No Products State */}
      {products?.length === 0 && (
        <div className="text-center py-12 col-span-full">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
          <p className="mt-1 text-sm text-gray-500">Comienza agregando tu primer producto al inventario.</p>
        </div>
      )}
      </div>
    </div>
  )
}
