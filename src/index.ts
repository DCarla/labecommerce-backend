import { createProduct, createUser, users } from "./database";
import { product } from "./database";
import { getAllUsers } from "./database";
import { getAllProducts } from "./database";
import { procurarProdutoPorNome } from "./database";

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

console.log(users);

console.table(getAllUsers());
console.table(getAllProducts());
console.table(procurarProdutoPorNome("mouse"));
