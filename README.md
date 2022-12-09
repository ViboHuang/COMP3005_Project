=================================================
Project: COMP3005 Final Book Store Project
Author: YiLong Huang
Date: 2022/12/8
Version: 1.0.1
=================================================
Source Files: bookstore.js
SQL files for reference: DDL.sql, DML.sql, Queries.sql
Run Command: node bookstore.js
Dependencies: npm Nodejs, SQlite3

--------------------------------------------------------------------------------------------
Running instructions: 
1. You have to install Nodejs, npm, and SQlite3 for this project to run. Visit the link below to see 
how you can install Nodejs and npm on windows: https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac#npm
2. Create a fresh project folder
3. Open a console in that folder
4. Install SQlite3 by typing into the console: npm install sqlite3
5. unzip the project.zip into the project folder.
6. Make sure you have Nodejs, npm, sqlite3 installed.
7. Run the in the console: node bookstore.js
8. The project should be running.
--------------------------------------------------------------------------------------------
Running notice:
1. If you run into any database problems you can always remove the sqlite database and restart it again by typing in the console: rm bstore
2. Sometimes you run into a block of error message like:
"SQLITE_CONSTRAINT: UNIQUE constraint failed: book_list.ISBN
SQLITE_CONSTRAINT: UNIQUE constraint failed: book_list.ISBN
SQLITE_CONSTRAINT: UNIQUE constraint failed: book_list.ISBN
SQLITE_CONSTRAINT: UNIQUE constraint failed: orders.order_num
SQLITE_CONSTRAINT: UNIQUE constraint failed: orders.order_num
SQLITE_CONSTRAINT: UNIQUE constraint failed: publisher_info.p_name
SQLITE_CONSTRAINT: UNIQUE constraint failed: publisher_info.p_name
SQLITE_CONSTRAINT: UNIQUE constraint failed: publisher_info.p_name"

This is because you didn't exit the program correctly (forced quit, etc), the previous runtime data have not been cleaned in the database. In this case, you can simply follow instruction 1) remove the database and restart the program again OR you can run the program with error and type "12" while running the program, so the program will enter a set quit route that will clean the database. (Note that this is only when you have a "block" of error like this, if it only one line or two, it might be have you are trying to insert some invalid value to the database, example: duplicate primary key for book ISBN).


