// import type { Product } from "../types/products.type";
import type { ProductResponse } from "../types/products.type";
import Swal from "sweetalert2";
import axios from "axios";

export const readProducts = async (): Promise<ProductResponse | null> => {
    try{
        const { data } = await axios.get<ProductResponse>("http://localhost:3001/api/read/products",
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }

        );  

        if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
            Swal.fire({
                icon:"info",
                titleText: "Para su información",
                text: data.resultadoTexto
            })
        }

        if(data.resultadoTipo === 'success'){
            return data
        }

        return null
    }catch(err){
        console.log('Error al obtener los datos', {error: err})
        Swal.fire({
            icon:"error",
            titleText: "Para su información",
            text: "Error al obtener los datos"
        })
        return null
    }
}


type ProductObject = {
    p_nombre: string,
    p_precio: number,
    p_descripcion: string,
    p_stock: number,
    p_stock_minimo: number,
    p_categoria_productos_id: number
}

export const createProduct = async ({
    p_nombre,
    p_precio,
    p_descripcion,
    p_stock,
    p_stock_minimo,
    p_categoria_productos_id
}: ProductObject): Promise<ProductResponse | null> => {
    try{
        const { data } = await axios.post<ProductResponse>("http://localhost:3001/api/create/product",
            {
                p_nombre,
                p_precio,
                p_descripcion,
                p_stock,
                p_stock_minimo,
                p_categoria_productos_id
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
            Swal.fire({
                icon:"info",
                titleText: "Para su información",
                text: data.resultadoTexto
            })
        }

        if(data.resultadoTipo === 'success'){
            return data
        }

        return null
    }catch(err){
        console.log('Error al crear el producto', {error: err})
        Swal.fire({
            icon:"error",
            titleText: "Para su información",
            text: "Error al crear el producto"
        })
        return null
    }   

}