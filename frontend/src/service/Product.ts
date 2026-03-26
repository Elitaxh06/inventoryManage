// import type { Product } from "../types/products.type";
import type { ProductResponse } from "../types/products.type";
import Swal from "sweetalert2";
import axios from "axios";
import { products_url } from "../enviroments/enviroments";

export const readProducts = async (): Promise<ProductResponse | null> => {
    try{
        const { data } = await axios.get<ProductResponse>(products_url.read_products,
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
        const { data } = await axios.post<ProductResponse>(products_url.create_product,
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

export const deleteProduct = async (productId: number): Promise<ProductResponse | null> => {
    try{
        const { data } = await axios.delete<ProductResponse>(products_url.delete_product + productId,
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
        console.log('Error al borrar el producto', {error: err})
        Swal.fire({
            icon:"error",
            titleText: "Para su información",
            text: "Error al borrar el producto"
        })
        return null
    }   
}