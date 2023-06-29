"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.procurarProdutoPorNome = exports.product = exports.users = exports.createProduct = exports.createUser = exports.getAllProducts = exports.getAllUsers = void 0;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function getAllProducts() {
    return exports.product;
}
exports.getAllProducts = getAllProducts;
const createUser = (id, name, email, password) => {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    exports.users.push(newUser);
    console.log("adicionado com sucesso");
};
exports.createUser = createUser;
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    exports.product.push(newProduct);
    console.log("adicionado com sucesso");
};
exports.createProduct = createProduct;
exports.users = [
    {
        id: "001",
        name: "Fulano",
        email: "dcs@gmail.com",
        password: "fulano123",
        createdAt: new Date().toISOString(),
    },
    {
        id: "002",
        name: "Beltrana",
        email: "dcc@gmail.com",
        password: "beltrana00",
        createdAt: new Date().toISOString(),
    },
];
exports.product = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Mellhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24  polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400",
    },
];
const procurarProdutoPorNome = (name) => {
    const resultado = exports.product.filter((produto) => {
        return produto.name.includes(name);
    });
    return resultado;
};
exports.procurarProdutoPorNome = procurarProdutoPorNome;
//# sourceMappingURL=database.js.map