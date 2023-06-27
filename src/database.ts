import { TUsers } from "./types";
import { TProducts } from "./types";

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
