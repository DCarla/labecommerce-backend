import { TUsers } from "./types";
import { TProducts } from "./types";

export function getAllUsers(): TUsers[] {
  return users;
}

export function getAllProducts(): TProducts[] {
  return product;
}

export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string
): void => {
  const newUser: TUsers = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  console.log("adicionado com sucesso");
};

export const createProduct = (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
): void => {
  const newProduct: TProducts = {
    id,
    name,
    price,
    description,
    imageUrl,
  };

  product.push(newProduct);
  console.log("adicionado com sucesso");
};

export const users: TUsers[] = [
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

export const product: TProducts[] = [
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
export const procurarProdutoPorNome = (name: string): TProducts[] => {
  const resultado = product.filter((produto) => {
    return produto.name.includes(name);
  });
  return resultado;
};
