/* Creating the 5 tables */
CREATE TABLE IF NOT EXISTS book_list (ISBN INT PRIMARY KEY, book_name VARCHAR(20), author VARCHAR(20), publisher_name VARCHAR(20), genre VARCHAR(20), num_pages INT, price NUMERIC(5,2), quantity INT)
    
CREATE TABLE IF NOT EXISTS orders (order_num INT PRIMARY KEY, status VARCHAR(100), warehouse VARCHAR(100))
    
CREATE TABLE IF NOT EXISTS publisher_info (p_name VARCHAR(20) PRIMARY KEY, address VARCHAR(100), email VARCHAR(100), phone VARCHAR(20), bank_acc INT)
    
CREATE TABLE IF NOT EXISTS sale_report (bid INT, b_name VARCHAR(20), quantity INT, genre VARCHAR(20), author VARCHAR(20), FOREIGN KEY (bid) REFERENCES book_list(ISBN))

CREATE TABLE IF NOT EXISTS expenditure_report (eid INT, description VARCHAR(200), amount NUMERIC(10,2))

/* Deleting the 5 tables */
DROP TABLE book_list

DROP TABLE orders

DROP TABLE publisher_info

DROP TABLE sale_report

DROP TABLE expenditure_report
