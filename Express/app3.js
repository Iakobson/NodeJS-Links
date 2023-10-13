// app.js
// підключення express
const express = require("express");
const PORT = 5000;

// створюємо об'єкт програми
const app = express();

// створюємо парсер для даних application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});

app.get("/form", function (request, response) {
    response.sendFile(__dirname + "/views/formpost.html");
});
app.post("/form", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});


app.get("/categories/:categoryId/products/:productId", function (request, response) {
    let catId = request.params["categoryId"];
    let prodId = request.params["productId"];
    response.send(`Категорія: ${catId}  Товар: ${prodId}`);
});






   


// починаємо прослуховувати підключення на порту
app.listen(PORT, ()=>console.log("Запускаємо серверну програму..."));

// node app.js
// npm start 
// http://localhost:5000/
// http://localhost:5000/form
// http://localhost:5000/categories/automatic/products/barrier7
// http://localhost:5000/
// http://localhost:5000/
