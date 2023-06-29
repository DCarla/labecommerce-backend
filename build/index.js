"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const database_2 = require("./database");
const database_3 = require("./database");
const database_4 = require("./database");
console.log("funcionou");
(0, database_1.createUser)("u0100", "Carla", "dc@gmail.com", "123456");
(0, database_1.createProduct)("prod003", "mouse pad", 40, "Ergonomico", "https://cdn.pixabay.com/photo/2020/04/04/15/04/click-5002627_1280.jpg");
console.log(database_1.users);
console.table((0, database_2.getAllUsers)());
console.table((0, database_3.getAllProducts)());
console.table((0, database_4.procurarProdutoPorNome)("mouse"));
//# sourceMappingURL=index.js.map