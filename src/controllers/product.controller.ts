import type { IncomingMessage, ServerResponse } from "node:http";
import { createProduct, productService } from "../services/product.service";
import type { Iproduct } from "../type/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const productController = async (req: IncomingMessage, res: ServerResponse)=>{
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
    // console.log(id)

    //All Products
    if(url === "/products" && method === "GET"){
        try {
            const products =productService();
            sendResponse(res,true,200,"Products Retrieved Successfully!!",products);
        } catch (error) {
            sendResponse(res,false,404,"Internal Server Error!!");
        }
    }
    else if (method === "GET" && id  != null){
        
        try {
            const products =productService();
            const product = products.find((p : Iproduct)=>p.id === id);
            if(!product){
                sendResponse(res,false,404,"Product Not Found!!")
            }
            sendResponse(res,true,200,"Product Retrieved Successfully!!",product)
        } catch (error) {
            sendResponse(res,false,404,"Internal Server Error!!")
        }
        const products =productService();
        const product = products.find((p : Iproduct)=>p.id === id);
        // console.log(product)
        
    }
    else if(method === "POST" && url === "/products"){

        const body =  await bodyParser(req);
        // console.log(body);
        const newProduct = {
            id : Date.now(),
            ...body
        }
        // console.log(newProduct)
        const products = productService();
        products.push(newProduct)

        createProduct(products);

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product is created!!", data : newProduct  }));
    }
    else if(method==="PUT" && id !==null){
        const body =  await bodyParser(req);
        const products = productService();
        const index = products.findIndex((p:Iproduct)=> p.id === id);
        // console.log(index);

        if(index < 0){
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Product Not Found!!" }));
            return;
        }

        // console.log(products[index]);
        products[index] = {id: products[index].id, ...body};

        createProduct(products);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product Updated Successfully!!", data : products[index] }));
    }

    else if(method === 'DELETE' && id !== null){

        const products = productService();
        const index = products.findIndex((p:Iproduct)=> p.id === id);
        // console.log(index);

        if(index < 0){
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "Product Not Found!!" }));
            return;
        }

        products.splice(index, 1);
        createProduct(products);        

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Product Deleted Successfully!!" }));
    }
    
    
}

export default productController;