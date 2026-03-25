import { useState} from "react";
import { createProduct } from "../../service/Product";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const categories = [
    { id: 1, name: "Cuadernos y Blocks" },
    { id: 2, name: "Agendas" },
    { id: 3, name: "Hojas" },
    { id: 4, name: "Escritura" },
    { id: 5, name: "Accesorios Escolares" },
    { id: 6, name: "Libros" },
    { id: 7, name: "Oficina" },
    { id: 8, name: "Paquetes / Kits" },
]

export default function CreateProductForm() {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0) 
    const [descripcion, setDescripcion] = useState('')
    const [stock, setStock] = useState(0)
    const [stockMinimo, setStockMinimo] = useState(0)
    const [categoriaProductosId, setCategoriaProductosId] = useState(0)
    const navigate = useNavigate()

    const insertProductHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if(nombre === '' || precio === 0 || stock === 0 || stockMinimo === 0 || categoriaProductosId === 0){
            Swal.fire({
                icon:"error",
                titleText: "Para su información",
                text: "Por favor, rellene todos los campos"
            })
            return
        }
        try{
            const result = await createProduct({
                p_nombre: nombre,
                p_precio: precio,
                p_descripcion: descripcion,
                p_stock: stock,
                p_stock_minimo: stockMinimo,
                p_categoria_productos_id: categoriaProductosId
            })
            if(result){
                Swal.fire({
                    icon:"success",
                    titleText: "Para su información",
                    text: result.resultadoTexto
                })
                navigate("/")
            }
        }catch(err){
            Swal.fire({
                icon:"error",
                titleText: "Para su información",
                text: "Error al crear el producto"
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Nuevo Producto</h1>
                    <p className="text-gray-600">Completa los campos para agregar un nuevo producto al inventario</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <form onSubmit={insertProductHandler} className="space-y-6">
                        
                        {/* Nombre de Producto */}
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 mb-2">
                                Nombre del Producto *
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Ej: Cuaderno A4 100 hojas"
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                required
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 mb-2">
                                Descripción
                            </label>
                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ej: Cuaderno de tamaño A4 con 100 hojas blancas rayadas"
                                rows={3}
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                            />
                        </div>

                        {/* Categoría */}
                        <div>
                            <label htmlFor="categoria" className="block text-sm font-medium text-gray-900 mb-2">
                                Categoría *
                            </label>
                            <select
                                id="categoria"
                                value={categoriaProductosId}
                                onChange={(e) => setCategoriaProductosId(Number(e.target.value))}
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                required
                            >
                                <option value={0}>Selecciona una categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Precio y Stock - Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Precio */}
                            <div>
                                <label htmlFor="precio" className="block text-sm font-medium text-gray-900 mb-2">
                                    Precio ($) *
                                </label>
                                <input
                                    id="precio"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={precio}
                                    onChange={(e) => setPrecio(Number(e.target.value))}
                                    placeholder="0.00"
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                    required
                                />
                            </div>

                            {/* Stock Actual */}
                            <div>
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-900 mb-2">
                                    Stock Actual *
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    placeholder="0"
                                    className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Stock Mínimo */}
                        <div>
                            <label htmlFor="stockMinimo" className="block text-sm font-medium text-gray-900 mb-2">
                                Stock Mínimo *
                            </label>
                            <input
                                id="stockMinimo"
                                type="number"
                                min="0"
                                value={stockMinimo}
                                onChange={(e) => setStockMinimo(Number(e.target.value))}
                                placeholder="0"
                                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                required
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-6">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium py-3 rounded-lg transition transform hover:scale-105 cursor-pointer shadow-sm"
                            >
                                💾 Guardar Producto
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded-lg transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

