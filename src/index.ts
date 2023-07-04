import { createProduct, createUser, product, users } from "./database";

import { getAllUsers } from "./database";
import { getAllProducts } from "./database";
import { procurarProdutoPorNome } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";

// console.log("funcionou");
// console.log(users);
// console.log(product);
createUser("u0100", "Carla", "dc@gmail.com", "123456");
createProduct(
  "prod003",
  "mouse pad",
  30,
  "Ergonomico",
  "https://cdn.pixabay.com/photo/2020/04/04/15/04/click-5002627_1280.jpg"
);

// console.log(users);

// console.table(getAllUsers());
// console.table(getAllProducts());
// console.table(procurarProdutoPorNome("mouse"));

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/product", (req: Request, res: Response) => {
  res.status(200).send(product);
});

app.get("/product/search", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const resultado = product.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
  res.status(200).send(resultado);
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso");
});

app.post("/product", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  let price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.description as string;

  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  product.push(newProduct);

  res.status(201).send("Produto cadastrado com sucesso");
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id;

  const userIndex = users.findIndex((user) => user.id === idToDelete);

  if (userIndex >= 0) {
    users.splice(userIndex, 1);
  }
  res.status(200).send("User apagado com sucesso");
});

app.delete("/product/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id;

  const productIndex = product.findIndex(
    (products) => products.id === idToDelete
  );

  if (productIndex >= 0) {
    product.splice(productIndex, 1);
  }
  res.status(200).send("Produto  apagado com sucesso");
});

app.put("/product/:id", (req: Request, res: Response) => {
  const idtoFind = req.params.id;

  const newId = req.body.newId as string | undefined;
  const newName = req.body.newName as string | undefined;
  const newPrice = req.body.newPrice as number | undefined;
  const newDescription = req.body.newDescription as string | undefined;
  const newImage = req.body.newImage as string | undefined;

  const result = product.find((product) => {
    return idtoFind === product.id;
  });

  if (result) {
    result.id = newId || result.id;
    result.name = newName || result.name;
    (result.price = isNaN(Number(newPrice))
      ? result.price
      : (newPrice as number)),
      (result.description = newDescription || result.description);
    result.imageUrl = newImage || result.imageUrl;
  }
  res.status(200).send("Produto atualizado com sucesso");
});
