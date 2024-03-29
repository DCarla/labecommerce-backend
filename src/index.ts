import { createProduct, createUser, product, users } from "./database";

import { getAllUsers } from "./database";
import { getAllProducts } from "./database";
import { procurarProdutoPorNome } from "./database";
import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";
import { type } from "os";
import { db } from "./database/knex";

createUser("u0100", "Carla", "dc@gmail.com", "123456");
createProduct(
  "prod003",
  "mouse pad",
  30,
  "Ergonomico",
  "https://cdn.pixabay.com/photo/2020/04/04/15/04/click-5002627_1280.jpg"
);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("servidor rodando 3003");
});

// Test with ping
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("Pong!");
});

//Get all users by ID
app.get("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
  }
});

// Get All Users  - Refatorando usando Knex - usando RAW
// Get All Users  - Refatorando usando Knex - usando QueryBuilder
app.get("/users", async (req: Request, res: Response) => {
  try {
    // ---->>> RAW <<<-----

    //   const resultUsers = await db.raw(`
    //  SELECT * FROM users
    // `);

    //---->QUERY BUILDER<----

    const resultUsers = await db("users");
    console.table(resultUsers);

    res.status(200).send(resultUsers);
  } catch (error: any) {
    console.log(error);
  }
});

// Get All purchases  - Refatorando usando Knex - usando RAW
// Get All purchases - Refatorando usando Knex - usando QueryBuilder
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    // ---->>> RAW <<<-----
    //   const resultPurchases = await db.raw(`
    //  SELECT * FROM purchases
    // `);

    //---->QUERY BUILDER<----
    const resultPurchases = await db("purchases");
    res.status(200).send(resultPurchases);
  } catch (error: any) {
    console.log(error);
  }
});

// Get All products - Refatorando usando Knex - usando RAW
// Get All products- Refatorando usando Knex - usando QueryBuilder
app.get("/products", async (req: Request, res: Response) => {
  try {
    // ---->>> RAW <<<-----
    //   const resultProducts = await db.raw(`
    //  SELECT * FROM products
    // `);

    //---->QUERY BUILDER<----
    const resultProducts = await db("products");
    res.status(200).send(resultProducts);
  } catch (error: any) {
    console.log(error);
  }
});

// Get All Products funcionalidade 2 - Refatorando usando Knex
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

      if (result.length === 0) {
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

//Add new user
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

//Add new product
app.post("/product", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

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
      throw new Error("'number' precisa ser um numero");
    }

    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("'imageUrl' precisa ser uma string");
    }

    const [productExist] = await db.raw(` 
    SELECT * FROM products
    WHERE id = '${id}'
    `);
    if (productExist) {
      res.status(404);
      throw new Error('"id" ja existe');
    }

    await db.raw(`
    INSERT INTO products(id, name, price,description, image_url)
    VALUES ('${id}', '${name}',${price},'${description}','${imageUrl}')
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

//Delete user by id
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

//Delete product  by ID
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

//Editando um produto Product by ID
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

// Create a purchase
app.post("/purchase", async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const buyer = req.body.buyer;
    const products = req.body.products;
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("Id precisa ser string");
    }
    if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("buyer precisa ser string");
    }
    const [purchase] = await db("purchases").where({ id });
    if (purchase) {
      res.status(404);
      throw new Error("Purchase já existe");
    }
    const resultProducts = [];
    let totalPrice = 0;
    for (let prod of products) {
      const [product] = await db("products").where({ id: prod.id });
      if (!product) {
        res.status(400);
        throw new Error(`${prod.id} não encontrado`);
      }
      resultProducts.push({ ...product, quantity: prod.quantity });
    }
    for (let product of resultProducts) {
      totalPrice += product.price * product.quantity;
    }
    const newPurchase = {
      id,
      buyer,
      total_price: totalPrice,
      created_at: new Date().toISOString(),
    };
    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const newPurchaseProducts = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };
      await db("purchases_products").insert(newPurchaseProducts);
    }

    res.status(201).send("Pedido realizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Delete purchase by Id
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

    res.status(200).send({ message: "Pedido foi deletado com sucesso" });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    console.log(error);
    res.send(error.message);
  }
});

//Lista de produtos que tem relação com a compra pesquisada.
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    let resultado;
    const idTosearch = req.params.id;
    const [resultado1] = await db
      .select(
        "purchases.id",
        "purchases.buyer AS buyerID",
        "users.name AS usersName",
        "users.email AS buyerEmail",
        "purchases.total_price",
        "purchases.created_at"
      )
      .from("purchases")
      .innerJoin("users", "purchases.buyer", "=", "users.id")
      .where("purchases.id", "=", idTosearch);
    console.log(resultado1);
    const products = await db
      .select("*")
      .from("purchases_products")
      .where("purchases_products.purchase_id", "=", idTosearch);

    resultado = { ...resultado1, products };
    console.log(resultado);

    if (products.length === 0) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

    res.status(200).send(resultado);
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    console.log(error);
    res.send(error.message);
  }
});
