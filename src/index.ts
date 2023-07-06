import { createProduct, createUser, product, users } from "./database";

import { getAllUsers } from "./database";
import { getAllProducts } from "./database";
import { procurarProdutoPorNome } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";
import { type } from "os";

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

app.listen(3003, () => {
  console.log("servidor rodando 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("Pong!");
});

app.get("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
  }
});
app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(users);
});

app.get("/product", (req: Request, res: Response) => {
  res.status(200).send(product);
});

app.get("/product/search", (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const result = product.find((prod) =>
      prod.name.toLowerCase().includes(name.toLowerCase())
    );

    if (name.length < 2) {
      res.status(400);
      throw new Error("'name' deve ter ao menos 2 caracteres");
    }

    if (!result) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' precisa ser uma string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' precisa ser uma string");
    }
    if (typeof email !== "string") {
      res.status(400);
      throw new Error("'email' precisa ser uma string");
    }

    if (typeof password !== "string") {
      res.status(400);
      throw new Error("'password' precisa ser uma string");
    }

    const idUserExiste = users.find((user) => user.id === id);
    if (idUserExiste) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    const EmailUserExiste = users.find((user) => user.email === email);
    if (EmailUserExiste) {
      res.status(400);
      throw new Error("'email' já existe");
    }

    const newUser: TUsers = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.post("/product", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.description as string;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' precisa ser uma string");
    }

    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'name' precisa ser uma string");
    }
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'price' precisa ser um numero diferente");
    }

    if (price <= 0) {
      res.status(400);
      throw new Error("'price' precisa ser maior 0");
    }
    if (typeof description !== "string") {
      res.status(400);
      throw new Error("'description' precisa ser uma string");
    }

    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' precisa ser uma string");
    }
    const idUProductExiste = product.find((prod) => prod.id === id);
    if (idUProductExiste) {
      res.status(400);
      throw new Error(
        " não deve ser possível criar mais de um produto com a mesma 'id'"
      );
    }

    const newProduct: TProducts = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    product.push(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const userIndex = users.findIndex((user) => user.id === idToDelete);

    if (userIndex < 0) {
      res.status(404);
      throw new Error("Usuario não encontrado");
    }
    users.splice(userIndex, 1);
    res.status(200).send("User apagado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const productIndex = product.findIndex((prod) => prod.id === idToDelete);

    if (productIndex < 0) {
      res.status(404);
      throw new Error("Produto não encontrando");
    }
    users.splice(productIndex, 1);

    res.status(200).send("Produto  apagado com sucesso");
  } catch (error: any) {
    res.send(error.message);
    console.log(error);
  }
});

app.put("/product/:id", (req: Request, res: Response) => {
  try {
    const idtoFind = req.params.id;

    const newId = req.body.newId as string | undefined;
    const newName = req.body.newName as string | undefined;
    const newPrice = req.body.newPrice as number | undefined;
    const newDescription = req.body.newDescription as string | undefined;
    const newImage = req.body.newImage as string | undefined;

    const result = product.find((product) => {
      return idtoFind === product.id;
    });

    //Validar os dados opcionais do body se eles forem recebidos

    if (newId !== undefined) {
      if (typeof newId !== "string")
        throw new Error(" 'ID' deve ser uma string");
      if (newId.length < 2) {
        throw new Error("O produto deve possuir no minimo 2 caracter");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string")
        throw new Error("'Name'deve ser uma string");
      if (newName.length < 2) {
        throw new Error("O produto deve possuir no minimo 2 caracter");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string")
        throw new Error("'Name'deve ser uma string");
      if (newDescription.length < 2) {
        throw new Error("O produto deve possuir no minimo 2 caracter");
      }
    }

    if (newImage !== undefined) {
      if (typeof newImage !== "string")
        throw new Error("'Name'deve ser uma string");
      if (newImage.length < 2) {
        throw new Error("O produto deve possuir no minimo 2 caracter");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number")
        throw new Error("'Price' deve ser um numero");
      if (newPrice <= 0) {
        throw new Error("O valor do produto deve ser maior que zero");
      }
    }

    if (result) {
      //positivo
      result.id = newId || result.id;
      result.name = newName || result.name;
      (result.price = isNaN(Number(newPrice))
        ? result.price
        : (newPrice as number)),
        (result.description = newDescription || result.description);
      result.imageUrl = newImage || result.imageUrl;

      res.status(200).send("Produto atualizado com sucesso");

      //Validar que o produto existe antes de editá-lo
    } else {
      // se não
      !result; // lado contrario
      res.status(404);
      throw new Error("O produto que você esta tentando editar não existe");
    }
  } catch (error: any) {
    res.send(error.message);
    console.log(error);
  }
});
