import type { IncomingMessage, ServerResponse } from "node:http";
import productController from "../controllers/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    // console.log("This is Root route")
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This is Root route!!" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    // console.log("This route is not defined!!")
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "This Route is not Defined!!" }));
  }
};
export default routeHandler;
