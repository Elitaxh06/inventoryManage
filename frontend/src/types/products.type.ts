export type Product = {
    producto_id: number,
    nombre: string,
    precio: number,
    descripcion: string,
    stock: number,
    stock_minimo: number,
    categoria_productos_id: number    
}   



export type ProductResponse = {
    resultadoTipo: "success" | "warning" | "error",
    resultadoTexto: string,
    datos: Product[] | null
}