-- Active: 1688999271964@@127.0.0.1@3306


-- Criação da tabela de pessoas usuárias

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT  NOT NULL UNIQUE,
    password TEXT  NOT NULL,
    created_at TEXT NOT NULL 
);



select * from users;
--Populando a tabela de pessoas usuárias

INSERT INTO users (id, name, email, password, created_at)
VALUES ("001","Fulano","dcs@gmail.com","fulano123",datetime('now')),
       ("002","Beltrana","sol@gmail.com","fulano123",datetime('now')),
       ("003","Ciclana","lua@hotmail.com","fulano123",datetime('now'));



--Criação da tabela de produtos
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price INTEGER  NOT NULL ,
    description TEXT  NOT NULL ,
    image_url TEXT  NOT NULL
)

-- Populando a tabela de produtos

INSERT INTO products (id, name, price, description, image_url)
VALUES ("prod001","Mouse Pad",20.00,"Ergonomico","https://i.ebayimg.com/images/g/croAAOSwvs9iMBqr/s-l500.jpg"),
       ("prod002","Monitor 32 polegadas",1.500,"Monitor LED","https://i.ebayimg.com/images/g/augAAOSwZttfNq6N/s-l500.jpg"),
       ("prod003","Teclado",30.00,"Teclado ABNT","https://i.ebayimg.com/images/g/loQAAOSw5Nhi6ROL/s-l500.jpg"),
       ("prod004","Notebook ",4.500,"Notebook Dell N2021","https://i.ebayimg.com/images/g/uDoAAOSwpFxkpX5O/s-l500.jpg"),
       ("prod005","HeadSet",260.00,"Sem fio","https://i.ebayimg.com/images/g/Z8sAAOSwz29kXxlI/s-l500.jpg")



DELETE FROM users