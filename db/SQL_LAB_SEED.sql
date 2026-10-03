-- Create this database separately from the Academy application database.
-- Then set SQL_LAB_DATABASE=your_database_name in the Node.js environment.

CREATE TABLE IF NOT EXISTS departments (
  id INT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INT,
  salary DECIMAL(12,2),
  joining_date DATE,
  city VARCHAR(100),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY,
  customer_id INT,
  order_date DATE,
  amount DECIMAL(12,2),
  status VARCHAR(30),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO departments (id, department_name) VALUES
(1,'Data Engineering'),(2,'Analytics'),(3,'AI'),(4,'Cloud')
ON DUPLICATE KEY UPDATE department_name=VALUES(department_name);

INSERT INTO employees (id,name,department_id,salary,joining_date,city) VALUES
(1,'Rahul',1,85000,'2023-01-10','Mathura'),
(2,'Priya',2,72000,'2023-03-15','Delhi'),
(3,'Amit',1,95000,'2022-08-21','Noida'),
(4,'Neha',3,110000,'2021-11-05','Bengaluru'),
(5,'Ravi',4,78000,'2024-02-12','Pune'),
(6,'Anjali',2,68000,'2024-05-20','Agra'),
(7,'Vikas',1,102000,'2020-07-17','Gurugram'),
(8,'Sneha',3,125000,'2022-04-02','Hyderabad'),
(9,'Karan',4,81000,'2023-09-11','Jaipur'),
(10,'Pooja',2,76000,'2024-01-18','Lucknow')
ON DUPLICATE KEY UPDATE name=VALUES(name),department_id=VALUES(department_id),salary=VALUES(salary),joining_date=VALUES(joining_date),city=VALUES(city);

INSERT INTO customers (id,name,city,email) VALUES
(1,'Customer One','Mathura','customer1@example.com'),
(2,'Customer Two','Delhi','customer2@example.com'),
(3,'Customer Three','Agra','customer3@example.com'),
(4,'Customer Four','Noida','customer4@example.com'),
(5,'Customer Five','Pune','customer5@example.com')
ON DUPLICATE KEY UPDATE name=VALUES(name),city=VALUES(city),email=VALUES(email);

INSERT INTO orders (id,customer_id,order_date,amount,status) VALUES
(101,1,'2026-01-05',1200,'Completed'),
(102,2,'2026-01-07',3500,'Completed'),
(103,1,'2026-01-15',2200,'Pending'),
(104,3,'2026-02-02',5100,'Completed'),
(105,4,'2026-02-10',1800,'Cancelled'),
(106,5,'2026-02-14',4200,'Completed')
ON DUPLICATE KEY UPDATE customer_id=VALUES(customer_id),order_date=VALUES(order_date),amount=VALUES(amount),status=VALUES(status);
