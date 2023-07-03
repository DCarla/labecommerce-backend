import { createProduct, createUser, users } from "./database";
import { product } from "./database";
import { getAllUsers } from "./database";
import { getAllProducts } from "./database";
import { procurarProdutoPorNome } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";

console.log("funcionou");
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
