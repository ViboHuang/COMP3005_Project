/* view all records in the book list */
SELECT * FROM book_list

/* view all records in publishers */
SELECT * FROM publisher_info

/* view all records in sales report */
SELECT * FROM sale_report

/* view all records in expenditure report */
SELECT * FROM expenditure_report

/* Search book by its ISBN, Please note some of the function do not work exactly into
   some SQL console since I used javascript and there are some javascript syntax incorporate into the queries
   please refer to the code for more detail*/
SELECT * FROM book_list WHERE ISBN = id

/* Search book by name */
SELECT * FROM book_list WHERE book_name = name

/* Search book by author*/
SELECT * FROM book_list WHERE author = name

/* inserting new (player defined) books into the store */
INSERT INTO book_list VALUES (ISBN, 'book name', 'author', 'publisher name', 'genre', num_pages, price, quantity)

/*Delete books */
DELETE FROM book_list WHERE ISBN = id

/*Find the order number in the orders table */
SELECT * FROM orders WHERE order_num = num

/*Update the quantity of some books */
UPDATE book_list SET quantity = q

/*Insert new sold item to sale_report table */
INSERT INTO sale_report VALUES (item.ISBN, 'item.book_name', 'item.quantity', 'item.genre', 'item.author}')

/*Insert new order(and its order number) into the orders table */
INSERT INTO orders VALUES (uniq_order_num, 'Prepared for shipping', 'OTTAWA')



