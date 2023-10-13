// app.js
// підключення express
const express = require("express");
const PORT = 5000;

// створюємо об'єкт програми
const app = express();
const fs = require("fs");

// цей middleware виконується кожного разу при http-запиті
app.use(function(request, response, next){    
    console.log("виконується Middleware 1");
    next();
});
// цей middleware виконується кожного разу при http-запиті
app.use(function(request, response, next){     
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    console.log(data);
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});

// визначаємо обробники для маршрутів
app.get("/", function(request, response){
    console.log("відбувся перехід на /");
    // відправляємо відповідь
	response.sendFile(__dirname + "/views/index.html");
});


app.use("/static", express.static(__dirname + "/views"));

app.get("/about", function(request, response){
    console.log("відбувся перехід на /about");
    response.send("<h1>Ось інформація про сайт</h1>");
});
app.get("/contact", function(request, response){
    console.log("відбувся перехід на /contact");
    response.send("<h1>Тут знайдете контакти</h1>");
});

app.use("/home/foo",function (request, response) {
  response.status(404).send(`Такий ресурс не знайдено`);
});

// робимо переадресацію на іншу адресу
app.use("/home",function (request, response) {
  response.redirect("about")
});

app.use("/users", function(request, response){      
    let id = request.query.id;
    let userName = request.query.name;
	console.log(id, userName);
    response.send("<h1>Дані про користувача:</h1><p>id=" + id +"</p><p>name=" + userName + "</p>");
});

// створюємо парсер для даних application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({extended: false});
  
app.get("/userform", function (request, response) {
    response.sendFile(__dirname + "/views/formpost.html");
});
app.post("/userform", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});
   


// починаємо прослуховувати підключення на порту
app.listen(PORT, ()=>console.log("Запускаємо серверну програму..."));

// node app.js
// npm start 
// http://localhost:5000/
// http://localhost:5000/about
// http://localhost:5000/home
// http://localhost:5000/home/foo
// http://localhost:5000/static/about.html
// http://localhost:5000/contact
// http://localhost:5000/users?id=37&name=Tome
// http://localhost:5000/userform
