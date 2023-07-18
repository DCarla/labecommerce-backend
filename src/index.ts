import { createProduct, createUser, product, users } from "./database";

import { getAllUsers } from "./database";
import { getAllProducts } from "./database";
import { procurarProdutoPorNome } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";
import { type } from "os";
import { db } from "./database/knex";

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

//Exercicio 1 - Get All Users  - Refatorando usando Knex

app.get("/users", async (req: Request, res: Response) => {
  try {
    const resultUsers = await db.raw(`
   SELECT * FROM users  
  `);
    res.status(200).send(resultUsers);
  } catch (error: any) {
    console.log(error);
  }
});

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const resultPurchases = await db.raw(`
   SELECT * FROM purchases 
  `);
    res.status(200).send(resultPurchases);
  } catch (error: any) {
    console.log(error);
  }
});

//Exercicio 1 - Get All Products funcionalidade 1  - Refatorando usando Knex

app.get("/products", async (req: Request, res: Response) => {
  try {
    const resultProducts = await db.raw(`
   SELECT * FROM products 
  `);
    res.status(200).send(resultProducts);
  } catch (error: any) {
    console.log(error);
  }
});

//Exercicio 1 - Get All Products funcionalidade 2 - Refatorando usando Knex

app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const searchName = req.query.name as string;

    if (searchName.length < 2) {
      res.status(400);
      throw new Error("'name' deve ter ao menos 2 caracteres");
    }

    if (searchName) {
      const result = await db.raw(`
  
      SELECT * FROM products
      WHERE name like '%${searchName}%'`);

      if (!searchName) {
        res.status(404);
        throw new Error("Produto não encontrado");
      }

      res.status(200).send(result);
    }
  } catch (error: any) {
    console.log(error);
    res.send(error.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

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

    const [userExist] = await db.raw(` 
    SELECT * FROM users
    WHERE id = '${id}'
    `);
    if (userExist) {
      res.status(400);
      throw new Error('"id" ja existe');
    }

    const [emailExist] = await db.raw(` 
    SELECT * FROM users
    WHERE email = '${email}'
    `);
    if (emailExist) {
      res.status(400);
      throw new Error('"email" ja existe');
    }

    await db.raw(`
    INSERT INTO users(id, name, email, password, created_at)
    VALUES ('${id}', '${name}','${email}','${password}', '${new Date().toISOString()}')
    `);

    res.status(200).send("Cadastro realizado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
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

//Edit Product by ID
app.put("/product/:id", async (req: Request, res: Response) => {
  try {
    const idToModify = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const [product] = await db.raw(`
      SELECT * FROM products
      WHERE id = '${idToModify}';
  `);
    if (product) {
      await db.raw(`
      UPDATE products
      SET 
          id = "${newId || product.id}",
          name = "${newName || product.name}",
          price = "${newPrice || product.price}",
          description = "${newDescription || product.description}",
          image_url = "${newImageUrl || product.image_url}"
      WHERE 
          id = "${idToModify}"
      `);
    } else {
      res.status(404);
      throw new Error("Produto não encontrado, por isso não foi atualizado.");
    }
    res.status(200).send("Produto atualizado com sucesso!");
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    console.log(error);
    res.send(error.message);
  }
});

app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const buyer = req.body.buyer;
    const total_price = req.body.total_price;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'ID' precisa ser uma string");
    }
    if (typeof buyer !== "number") {
      res.status(400);
      throw new Error("'Buyer' precisa ser uma string");
    }
    if (typeof total_price !== "number") {
      res.status(400);
      throw new Error("'total_price' precisa ser um numero");
    }

    const [purchaseExist] = await db.raw(` 
    SELECT * FROM purchases
    WHERE id = '${id}'
    `);
    if (purchaseExist) {
      res.status(400);
      throw new Error('"id" ja existe');
    }

    await db.raw(`
    INSERT INTO purchases (id, buyer, total_price, created_at)
    VALUES ('${id}', '${buyer}', ${total_price}, '${new Date().toISOString()}' );
    `);

    res.status(201).send("Pedido cadastrado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const deletePurchase = req.params.id;

    const [purchase] = await db.raw(`

     SELECT * FROM purchases
     WHERE id = "${deletePurchase}";
  `);

    if (!purchase) {
      res.status(404);
      throw new Error("' pedido' não encontrado");
    }
    await db.raw(`
    DELETE FROM purchases
    WHERE id = "${deletePurchase}";
   `);

    res.status(200).send({ message: "Pedido foi deletados com sucesso" });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    console.log(error);
    res.send(error.message);
  }
});
