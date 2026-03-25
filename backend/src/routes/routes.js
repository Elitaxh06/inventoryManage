import { Router } from "express";
import { readProducts, createProduct, deleteProduct } from "../controller/products.controller.js";

const routes = Router()

routes.get("/read/products", readProducts)
routes.post("/create/product", createProduct)
routes.delete("/delete/product", deleteProduct)

export default routes;