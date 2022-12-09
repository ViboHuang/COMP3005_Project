const { mainModule, exit, abort } = require('process');

const sqlite3 = require('sqlite3').verbose();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let cart = []; //gobal array for shopping cart
let uniq_order_num = 1000000000;

//opening/creating a database
let db = new sqlite3.Database('bstore', (err)=>{
    if(err){
        return console.error(err.message);
    }
    console.log("Connecttion to database sucessfully.");
    //initializing tables
    init_tables(db);
    main(); //calling the main function
});

function main(){
    
    readline.question(
        "\nMenu:\n"+
        "1. View book list\n"+
        "2. Search book\n"+
        "3. Add book to store\n"+
        "4. Remove book from store\n"+
        "5. View all publishers\n"+
        "6. Track order number\n"+
        "7. View sales report\n"+
        "8. View expenditure report\n"+
        "9. Buy a book\n"+
        "10. Review shopping cart\n"+
        "11. Clear shopping cart\n"+
        "12. Exit\n",choice=>{
            switch(choice){
                case "1":
                    viewList();
                    break;
                case "2":
                    searchBook();
                    break;
                case "3":
                    addBook();
                    break;
                case "4":
                    removeBook();
                    break;
                case "5":
                    viewPublisher();
                    break;
                case "6":
                    trackOrder();
                    break;
                case "7":
                    viewSaleReport();
                    break;
                case "8":
                    viewExpendReport();
                    break;
                case "9":
                    buyBook();
                    break;
                case "10":
                    viewShoppingCart();
                    break;
                case "11":
                    clearShoppingCart();
                    break;
                case "12":
                    dropAllTables();
                    break;
                default:
                    console.log("Please enter a valid entry")               
            }
        });
}
/*****************************************************************


Functions


*****************************************************************/

// view the book list
function viewList(){
    db.all("SELECT * FROM book_list",[], (err, result)=>{
        if(err){
          throw error;
        }
        console.log("------------------- Books List -------------------");
        console.log(result);
        main();
    });
}

// view the publishers
function viewPublisher(){
    db.all("SELECT * FROM publisher_info",[], (err, result)=>{
        if(err){
          throw error;
        }
        console.log("------------------- Publisher Info -------------------");
        console.log(result);
        main();
    });
}
// view sales report
function viewSaleReport(){
    db.all("SELECT * FROM sale_report",[], (err, result)=>{
        if(err){
          throw error;
        }
        console.log("------------------- Sale Report -------------------");
        console.log(result);
        main();
    });
}

// search book
function searchBook(){
    readline.question(
        "\nSearch book by:\n"+
        "1. ISBN\n"+
        "2. Book name\n"+
        "3. Author\n",choice=>{
            switch(choice){
                case "1":
                    searchByID();
                    break;
                case "2":
                    searchByName();
                    break;
                case "3":
                    searchByAuthor();
                    break;
                default:
                    console.log("Please enter a valid entry");
            }
            main();
        });
}

function searchByID(){
    readline.question(
        "Please enter the ISBN of the book: ", id=>{
            db.all("SELECT * FROM book_list WHERE ISBN = ?", [id], (err, result)=>{
                if(err){
                    console.error(err.message);
                }
                else if(result.length == 0){
                    console.log("Invalid ISBN, book not found");
                }else{
                    console.log("\nMatched Results:")
                    console.log(result);
                }
                main();
            });
    });
}

function searchByName(){
    readline.question(
        "Please enter the Full name of the book: ", name=>{
            db.all("SELECT * FROM book_list WHERE book_name = ?", [name], (err, result)=>{
                if(err){
                    console.error(err.message);
                }
                else if(result.length == 0){
                    console.log("book name not found");
                }else{
                    console.log("\nMatched Results:")
                    console.log(result);
                }
                main();
            });
    });
}

function searchByAuthor(){
    readline.question(
        "Please enter the full name of the author: ", name=>{
            db.all("SELECT * FROM book_list WHERE author = ?", [name], (err, result)=>{
                if(err){
                    console.error(err.message);
                }
                else if(result.length == 0){
                    console.log("Author not found");
                }else{
                    console.log("\nMatched Results:")
                    console.log(result);
                }
                main();
            });
    });
}

// add a book to store
function addBook(){
    let isbn; 
    let bName; 
    let author; 
    let publisherName;
    let genre;
    let num_pages;
    let price;
    let quantity;

    readline.question(
        "Please enter the ISNB for the book (Integers ONLY!): ", id=>{
        isbn = parseInt(id);
        readline.question(
            "Please enter the name of the book: ", n=>{
            bName = n;
            readline.question(
                "Please enter the author of the book: ", a=>{
                author = a;
                readline.question(
                    "Please enter the publisher of the book: ", p=>{
                    publisherName = p;
                    readline.question(
                        "Please enter the genre of the book: ", g=>{
                        genre = g;
                        readline.question(
                            "Please enter the number of pages of the book: (Integers ONLY!) ", num=>{
                            num_pages = parseInt(num);
                            readline.question(
                                "Please enter the price of the book: (NUMBERS ONLY!, may have 2 decimals) ", pr=>{
                                price = parseFloat(pr);
                                readline.question(
                                    "Please enter quantity of the book: (0 or Positive integers ONLY!) ", q=>{
                                    quantity = parseInt(q);
                                    db.exec(`INSERT INTO book_list VALUES (${isbn}, '${bName}', '${author}', '${publisherName}', '${genre}', ${num_pages}, ${price}, ${quantity})`,(err)=>{
                                        if(err)
                                            console.error(err.message+" -- Check all inputs(format, ISBN not overlaped)");
                                        else
                                            console.log("Book added")
                                        main();
                                        
                                    });
                                });
                            });
                        });
                    });
                });
            });                 
        });
    });
}

//remove a book from store
function removeBook(){
    readline.question(
        "Please enter the book ISBN for removal: ", choice=>{
        db.get("SELECT ISBN FROM book_list WHERE ISBN = ?",[choice],(err, result)=>{
            if(err){return console.error(err.message);}
            else if(result == undefined){
                console.log("Invalid ISNB, book not found");
                main();
            }else{
                db.run(`DELETE FROM book_list WHERE ISBN = ${choice}`,(err)=>{
                    if(err)
                        return console.error(err.message);
                    console.log("Book removed")
                    main();
                });
            }
        });
    });
}

//track order number
function trackOrder(){
    readline.question(
        "Please enter the order: ", num=>{
        db.get("SELECT * FROM orders WHERE order_num = ?",[parseInt(num)],(err, result)=>{
            if(err){return console.error(err.message);}
            else if(result == undefined){
                console.log("Invalid order number, order not found");
                main();
            }else{
                console.log("\nYou order is found:")
                console.log(result);
                main();
            }
        });
    });
}


// buying a book
function buyBook(){
    readline.question("Please enter ISBN of the book that you like to buy: ", id=>{
        db.get("SELECT * FROM book_list WHERE ISBN = ?", [id], (err, result)=>{
            if(err){
                console.error(err.message);
            }else if(result == undefined){
                console.log("Invalid ISBN number, book not found");
                main();
            }else{
                readline.question("Please enter the quantity that you like to buy: (Must be smaller than the quantity the store have) ", q=>{
                    if(q > result.quantity){
                        console.log("Invalid quantity, not enough stock");
                        main();
                    }else{
                        if(cart.length==0){
                            cart.push({ISBN:parseInt(id),book_name:result.book_name, quantity:parseInt(q)}); 
                        }else{
                            let item_found = false;
                            cart.forEach(item=>{
                                if(item.ISBN == id){ // if the same item already exists in the cart
                                    item.quantity += parseInt(q); // we then only increase the quantity
                                    item_found = true;
                                }})
                            if(item_found==false){
                                cart.push({ISBN:parseInt(id),book_name:result.book_name, quantity:parseInt(q)}); // if not, then a new item is added to cart
                                item_found = false;
                            }
                        }
                        console.log("Book successfully added to cart");
                        main();
                    }
                });
            }
        });
    });
}

// view expenditure report
function viewExpendReport(){
    db.all("SELECT * FROM expenditure_report",[], (err, result)=>{
        if(err){
          throw error;
        }
        console.log("------------------- Expenditure Report -------------------");
        console.log(result);
        return main();
    });
}

// viewing the shopping cart and make final purchases
function viewShoppingCart(){
    console.log("\n================== In your cart: ==================\n");
    console.log(cart);
    readline.question("Are you a member of the store? (Y/N)\n", ans=>{
        if (ans!="Y"){
            console.log("ACCESS DENIED: You have to be a member of the store to check out books");
            return viewShoppingCart();
        }
        readline.question("Are you sure you are ready to complete the purchase? (Y/N)\n", ans=>{
            if (ans!="Y"){
                console.log("Navigating back to the menu..");
                return main();
            }
            readline.question("Please enter you bank account for direct payment: \n", ans=>{
                readline.question("Please enter your shiping address: \n", ans=>{
                    cart.forEach(item=>{
                        db.get("SELECT * FROM book_list WHERE ISBN = ?", [item.ISBN], (err, result)=>{
                            if(err){
                                console.error(err.message);
                                return main();
                            }else if(result.quantity < item.quantity){ // not enough stock
                                console.error(`INCOMPLETE PURCHASE: not enough stock for ${item.book_name}, please check available quantity`);
                                return viewShoppingCart();
                            }else{ // completing the purchase
                                db.run(`UPDATE book_list SET quantity = ? WHERE ISBN = ?`,[(result.quantity-item.quantity), item.ISBN],(err)=>{
                                    if(err)
                                        return console.error(err.message);
                                    // inserting new sale info to sales report
                                    db.exec(`INSERT INTO sale_report VALUES (${item.ISBN}, '${item.book_name}', '${item.quantity}', '${result.genre}', '${result.author}')`,(err)=>{
                                        if(err){
                                            console.error(err.message);
                                        }
                                        console.log("Completing the purchase...")
                                        // creating the order
                                        db.exec(`INSERT INTO orders VALUES (${uniq_order_num}, 'Prepared for shipping', 'OTTAWA')`,(err)=>{
                                            if(err)
                                                console.error(err.message);
                                            console.log(`You order is completed, Please keep your order number with you: ${uniq_order_num}`);
                                            uniq_order_num++;
                                            cart = [];
                            
                                            // re-suppling the books
                                            db.all("SELECT * FROM book_list",[], (err, result)=>{
                                                if(err){
                                                console.error(err+"---ISSUE: BOOK RE-SUPPLY INCOMPLETED")
                                                }
                                                result.forEach(book=>{
                                                    if(book.quantity < 10){
                                                        db.run(`UPDATE book_list SET quantity = ? WHERE ISBN = ?`,[(book.quantity+10), book.ISBN],(err)=>{
                                                            if(err)
                                                                return console.error(err.message);
                                                        });
                                                    }
                                                });
                                                console.log("--- BOOK RE-SUPPLIED ---")
                                                main();
                                            });           
                                        });                        
                                    });
                                });
        
                            }
                        });
                    });
                });
            });
        });
    }); 

}


// clear shopping cart
function clearShoppingCart(){
    console.log("Cart Cleared");
    cart = [];
    return main();
}


// creating & initializing the tables
function init_tables(db){
    // Creating
    db.exec("CREATE TABLE IF NOT EXISTS book_list (ISBN INT PRIMARY KEY, book_name VARCHAR(20), author VARCHAR(20), publisher_name VARCHAR(20), genre VARCHAR(20), num_pages INT, price NUMERIC(5,2), quantity INT)", (err)=>{
        if(err)
            return console.error(err.message);
    });
    
    db.exec("CREATE TABLE IF NOT EXISTS orders (order_num INT PRIMARY KEY, status VARCHAR(100), warehouse VARCHAR(100))", (err)=>{
        if(err)
            return console.error(err.message);
    });
    
    db.exec("CREATE TABLE IF NOT EXISTS publisher_info (p_name VARCHAR(20) PRIMARY KEY, address VARCHAR(100), email VARCHAR(100), phone VARCHAR(20), bank_acc INT)", (err)=>{
        if(err)
            return console.error(err.message);
    });
    
    db.exec("CREATE TABLE IF NOT EXISTS sale_report (bid INT, b_name VARCHAR(20), quantity INT, genre VARCHAR(20), author VARCHAR(20), FOREIGN KEY (bid) REFERENCES book_list(ISBN))", (err)=>{
        if(err)
            return console.error(err.message);
    });

    db.exec("CREATE TABLE IF NOT EXISTS expenditure_report (eid INT, description VARCHAR(200), amount NUMERIC(10,2))", (err)=>{
        if(err)
            return console.error(err.message);
    });

    // initializing book_list table
    db.exec("INSERT INTO book_list VALUES (1,'Harry Potter', 'J. K. Rowling','Bloomsbury Publishing','Fantasy', 219, 22.55, 20)",(err)=>{
        if(err)
            return console.error(err.message);
    });
    db.exec("INSERT INTO book_list VALUES (2,'IT', 'Stephen King','Viking', 'Horror', 132, 19.99, 20)",(err)=>{
        if(err)
            return console.error(err.message);
    });
    db.exec("INSERT INTO book_list VALUES (3,'Enders Game', 'Orson Scott Card','Tor Books','Science fiction', 219, 22.55, 20)",(err)=>{
        if(err)
            return console.error(err.message);
    });
    
    // initializing order table
    db.exec("INSERT INTO orders VALUES (777777777,'Prepared for shipping', 'OTTWAWA')",(err)=>{
        if(err)
            return console.error(err.message);
    });
    
    db.exec("INSERT INTO orders VALUES (888888888,'On the carrier', 'OTTWAWA')",(err)=>{
        if(err)
            return console.error(err.message);
    });
    
    // initializing publisher_info table
    db.exec("INSERT INTO publisher_info VALUES ('Bloomsbury Publishing','50 Bedford Square, London WC1B 3DP, United Kingdom', 'weborders@mpsvirginia.com', '(+44)144-441-6119', 998998998998)",(err)=>{
        if(err)
            return console.error(err.message);
    });
    db.exec("INSERT INTO publisher_info VALUES ('Viking','1339 Viking Dr, Ottawa, ON K1V 7J6', 'info@viking.com', '(+1)123-456-7891', 767676767676)",(err)=>{
        if(err)
            return console.error(err.message);
    });
    db.exec("INSERT INTO publisher_info VALUES ('Tor Books','175 5th Ave #14, New York, NY 10010, United States', 'webmaster@tor.com.', '(+1)212-388-0100', 123123123123)",(err)=>{
        if(err)
            return console.error(err.message);
    });
    
    // initializing sale_report table
    db.exec("INSERT INTO sale_report VALUES (1,'Harry Potter', 1, 'Fantasy', 'J. K. Rowling')",(err)=>{
        if(err)
            return console.error(err.message);
    });

    // initializing expenditure_report table
    db.exec("INSERT INTO expenditure_report VALUES (1,'Hydro ottawa eletricity bill', 1279.54)",(err)=>{
    if(err)
        return console.error(err.message);
    });

    db.exec("INSERT INTO expenditure_report VALUES (2,'Cost of buying store equipment', 799.99)",(err)=>{
        if(err)
            return console.error(err.message);
    });
}

//drop all tables before exit
function dropAllTables(){
    db.exec("DROP TABLE book_list",(err)=>{
        if(err)
            return console.error(err.message);
    });
    db.exec("DROP TABLE orders",(err)=>{
        if(err)
            return console.error(err.message);
    });  
    db.exec("DROP TABLE publisher_info",(err)=>{
        if(err)
            return console.error(err.message);
    });
    db.exec("DROP TABLE sale_report",(err)=>{
        if(err)
            return console.error(err.message);
        console.log("Closing connection to database")
        db.close();
        exit(0);
    });
}