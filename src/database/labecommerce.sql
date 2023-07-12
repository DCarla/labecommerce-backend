-- Active: 1688999271964@@127.0.0.1@3306


-- Criação da tabela de pessoas usuárias

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT  NOT NULL UNIQUE,
    password TEXT  NOT NULL,
    created_at TEXT NOT NULL 
);


-- Comando para apagar tabela

DROP TABLE users;

-- Comando para procurar itens em uma tabela 

select * from users;





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

    price REAL  NOT NULL ,
    description TEXT  NOT NULL ,
    image_url TEXT  NOT NULL
);


-- Populando a tabela de produtos

INSERT INTO products (id, name, price, description, image_url)

VALUES ("prod001","Mouse Pad", 20 ,"Ergonomico","https://i.ebayimg.com/images/g/croAAOSwvs9iMBqr/s-l500.jpg"),
       ("prod002","Monitor 32 polegadas", 1599.90 ,"Monitor LED","https://i.ebayimg.com/images/g/augAAOSwZttfNq6N/s-l500.jpg"),
       ("prod003","Teclado", 30 ,"Teclado ABNT","https://i.ebayimg.com/images/g/loQAAOSw5Nhi6ROL/s-l500.jpg"),
       ("prod004","Notebook ",4500 ,"Notebook Dell N2021","https://i.ebayimg.com/images/g/uDoAAOSwpFxkpX5O/s-l500.jpg"),
       ("prod005","HeadSet", 260 ,"Sem fio","https://i.ebayimg.com/images/g/Z8sAAOSwz29kXxlI/s-l500.jpg");

SELECT * FROM products;


DROP TABLE products;


---Get All Users
SELECT * FROM users;

---Get All Products (funcionalidade 1)
SELECT * FROM products;

--Get all Products (funcionalidade 2)

SELECT * FROM products
WHERE name like '%mouse%' ;

--Create User

INSERT INTO users (id, name, email, password, created_at)
VALUES("004","Maria Silva","marsilva@gmail.com","Maria123",datetime('now'));

--Create Product

INSERT INTO products (id, name, price, description, image_url)

VALUES ("prod007","Mouse sem fio ", 71 ,"Mouse sem fio ultra power","https://m.media-amazon.com/images/I/516AWo2VjRL._AC_SL1000_.jpg");


--Delete User by id

DELETE FROM users
WHERE id = "001";

--Delete Product by id

DELETE FROM products
WHERE id = "prod006";

--Edit Product by id

--Edição de produto por id
UPDATE products
SET description = 'Notebook Dell W2022'
WHERE id = 'prod004';



--Faça a query editar todas as colunas do item -- Products
UPDATE products
SET name = 'Telefone sem fio',
    price = 300, 
    description = 'telefone com bina',
    image_url = 'https://i.ebayimg.com/images/'

where id  = 'prod005';
 select * from products;

 --Faça a query editar todas as colunas do item--Users

UPDATE users
SET name = 'Carla Souza',
    email = 'dc@gmail.com',
    password = '123456',
    created_at = datetime('now')

where id  = '003';


 select * from users;


