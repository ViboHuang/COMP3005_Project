/* initializing the book_list table (provide the table with 3 initial values) */
INSERT INTO book_list VALUES (1,'Harry Potter', 'J. K. Rowling','Bloomsbury Publishing','Fantasy', 219, 22.55, 20)

INSERT INTO book_list VALUES (2,'IT', 'Stephen King','Viking', 'Horror', 132, 19.99, 20)

INSERT INTO book_list VALUES (3,'Enders Game', 'Orson Scott Card','Tor Books','Science fiction', 219, 22.55, 20)

/* initializing the orders table */
INSERT INTO orders VALUES (777777777,'Prepared for shipping', 'OTTWAWA')

INSERT INTO orders VALUES (888888888,'On the carrier', 'OTTWAWA')

/* initializing the publisher_info table */
INSERT INTO publisher_info VALUES ('Bloomsbury Publishing','50 Bedford Square, London WC1B 3DP, United Kingdom', 'weborders@mpsvirginia.com', '(+44)144-441-6119', 998998998998)

INSERT INTO publisher_info VALUES ('Viking','1339 Viking Dr, Ottawa, ON K1V 7J6', 'info@viking.com', '(+1)123-456-7891', 767676767676)

INSERT INTO publisher_info VALUES ('Tor Books','175 5th Ave #14, New York, NY 10010, United States', 'webmaster@tor.com.', '(+1)212-388-0100', 123123123123)

/* initializing the sale_report table */
INSERT INTO sale_report VALUES (1,'Harry Potter', 1, 'Fantasy', 'J. K. Rowling')

/* initializing the expenditure_report table */
INSERT INTO expenditure_report VALUES (1,'Hydro ottawa eletricity bill', 1279.54)

INSERT INTO expenditure_report VALUES (2,'Cost of buying store equipment', 799.99)
