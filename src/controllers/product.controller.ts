import type { IncomingMessage, ServerResponse } from "node:http";
import { productService } from "../services/product.service";
import type { Iproduct } from "../type/product";

const productController = (req: IncomingMessage, res: ServerResponse)=>{
    // const products = [
    //     {
    //         id : 1,
    //         name : "Macbook"
    //     },
    //     {
    //         id : 2,
    //         name : "PS5"
    //     }
    // ]
    
    
    const url = req.url;
    const method = req.method;
    const urlParams = url?.split("/")
    const id = urlParams && urlParams[1]==='products' ? Number(urlParams[2]) : null;
    console.log(id)
    //All Products
    if(url === "/products" && method === "GET"){
        const products =productService();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is Products route!!", data : products }));
    }
    else if (method === "GET" && id  != null){
        const products =productService();
        const product = products.find((p : Iproduct)=>p.id === id);
        console.log(product)
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is Products route!!", data : product }));
    }
    
    
}
export default productController;