const express = require("express");
const morgan = require("morgan");

const app = express();

let products = [{ id: 1, name: "Laptop", price: 1000 }];

app.use(morgan("dev"));
app.use(express.json());

app.set("appName", "Express Course");

app.get("/products", (req, resp) => {
  resp.json(products);
});

app.get("/products/:id", (req, resp) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    return resp.status(404).json({ message: "Product not found" });
  }

  resp.send(`The product name is ${product.name}`);
});

app.post("/products", (req, resp) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  resp.send("Product created");
});

app.put("/products/:id", (req, resp) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    return resp.status(404).json({ message: "Product not found" });
  }

  products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...req.body} : p)
  resp.json({ message: "Product updated" });
});

app.delete("/products/:id", (req, resp) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    return resp.status(404).json({ message: "Product not found" });
  }

  products = products.filter((p) => p.id !== parseInt(req.params.id));
  resp.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
