let Enviroment = "";

// Enviroment = "dev";
Enviroment = "prod";

let api_url_products = "";


switch (Enviroment){
    case "dev" : api_url_products = "http://localhost:3001/api/";
    break;
    case "prod" : api_url_products = "https://inventorymanage.onrender.com/api/";
    break;
    default: api_url_products = "http://localhost:3001/api/";
    break;
}

export const products_url = {
    read_products: api_url_products + import.meta.env.VITE_API_READ_PRODUCTS,
    create_product: api_url_products + import.meta.env.VITE_API_CREATE_PRODUCT,
    delete_product: api_url_products + import.meta.env.VITE_API_DELETE_PRODUCT
}