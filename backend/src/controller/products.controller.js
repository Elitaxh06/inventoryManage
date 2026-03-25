import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    process.env.supabase_url,
    process.env.supabase_key
)

export const readProducts = async (req, res) => {
    try{
        const { data, error } = await supabase
            .rpc("fn_read_products")
        
        if(error){
            return res.status(500).json({
                resultadoTipo: "error",
                resultadoTexto: error.message,
                datos: null
            })
        }

        if(!data || data.length === 0){
            return res.status(200).json({
                resultadoTipo: "warning",
                resultadoTexto: "No hay productos",
                datos: null
            })
        }

        return res.status(200).json({
            resultadoTipo: "success",
            resultadoTexto: "Productos obtenidos correctamente",
            datos: data
        })
    }catch(err){
        return res.status(500).json({
            resultadoTipo: "error",
            resultadoTexto: "Error del servidor",
            datos: null
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {
            p_nombre,
            p_precio,
            p_descripcion,
            p_stock,
            p_stock_minimo,
            p_categoria_productos_id
        } = req.body;

        // Validaciones básicas de request
        if (!p_nombre || p_precio === undefined || p_stock === undefined || p_stock_minimo === undefined || !p_categoria_productos_id) {
            return res.status(400).json({
                resultadoTipo: "warning",
                resultadoTexto: "Faltan datos requeridos para crear el producto",
                datos: null
            });
        }

        if (p_precio < 0 || p_stock < 0 || p_stock_minimo < 0) {
            return res.status(400).json({
                resultadoTipo: "warning",
                resultadoTexto: "precio, stock y stock_minimo deben ser valores no negativos",
                datos: null
            });
        }

        if (p_stock < p_stock_minimo) {
            return res.status(400).json({
                resultadoTipo: "warning",
                resultadoTexto: "El stock no puede ser menor al stock mínimo",
                datos: null
            });
        }

        const { data, error } = await supabase.rpc("fn_insert_product", {
            p_nombre: p_nombre,
            p_precio: p_precio,
            p_descripcion: p_descripcion || "",
            p_stock: p_stock,
            p_stock_minimo: p_stock_minimo,
            p_categoria_id: p_categoria_productos_id
        });

        if (error) {
            return res.status(500).json({
                resultadoTipo: "error",
                resultadoTexto: error.message,
                datos: null
            });
        }

        if (!data || data.length === 0) {
            return res.status(500).json({
                resultadoTipo: "error",
                resultadoTexto: "No se pudo crear el producto",
                datos: null
            });
        }

        return res.status(201).json({
            resultadoTipo: "success",
            resultadoTexto: "Producto creado correctamente",
            datos: data[0]
        });

    } catch (err) {
        return res.status(500).json({
            resultadoTipo: "error",
            resultadoTexto: "Error del servidor",
            datos: null
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { producto_id } = req.body;

        // Validación básica
        if (!producto_id) {
            return res.status(400).json({
                resultadoTipo: "warning",
                resultadoTexto: "El ID del producto es requerido",
                datos: null
            });
        }

        const { data, error } = await supabase.rpc('fn_delete_product', {
            p_producto_id: producto_id
        });

        if (error) {
            return res.status(500).json({
                resultadoTipo: "error",
                resultadoTexto: error.message,
                datos: null
            });
        }

        return res.status(200).json({
            resultadoTipo: "success",
            resultadoTexto: "Producto eliminado correctamente",
            datos: null
        });

    } catch (err) {
        return res.status(500).json({
            resultadoTipo: "error",
            resultadoTexto: "Error del servidor",
            datos: null
        });
    }
};