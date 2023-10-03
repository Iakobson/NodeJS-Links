# Node Server

Для роботи з сервером та протоколом http у Node.js використовується модуль http.

### Request

Параметр request дозволяє отримати інформацію про запит і представляє об'єкт http.IncomingMessage.\
Зазначимо деякі основні властивості цього об'єкта:
+ **headers**: повертає заголовки запиту
+ **method**: тип запиту (GET, POST, DELETE, PUT)
+ **url**: представляє запитувану адресу

### Response

Параметр response керує надсиланням відповіді та представляє об'єкт http.ServerResponse.\
Серед його функціональності можна виділити такі методи:

+ **statusCode**: встановлює статусний код відповіді
+ **statusMessage**: встановлює повідомлення, яке надсилається разом зі статусним кодом
+ **setHeader(name, value)**: додає у відповідь один заголовок
+ **write**: пише у потік відповіді деякий вміст
+ **writeHead**: додає у відповідь статусний код та набір заголовків
+ **end**: сигналізує серверу, що заголовки і тіло відповіді встановлені, у результаті відповідь надсилається клієнта.

#### створення простого серверу

```javascript
 // app.js
const http = require("http");

http.createServer(function(request, response){
  // метод .createServer =>> повертає об'єкт http.Server 
    // request =>> зберігає інформацію про запит
    // response =>> керує відправкою відповіді
    console.log("Url: " + request.url);
    console.log("Тип запиту: " + request.method);
    console.log("User-Agent: " + request.headers["user-agent"]);
    console.log("Перелік усіх заголовків: ");
    console.log(request.headers);
    
    response.setHeader("UserId", 13);
    response.setHeader("Content-Type", "text/html");
    response.write("<!DOCTYPE html>");
    response.write("<html>");
    response.write("<head>");
      response.write("<meta charset=\"utf-8\" />");	
      response.write("<title>Hello Node.js</title>");
    response.write("</head>");
    response.write("<body><h2>Працюємо із http сервером.</h2></body>");
    response.write("</html>");
    
	response.end("This is end of http!");
}).listen(3000);
```

> Запустимо його та звернемося у браузері за адресою http://localhost:3000/

### Маршрутизація

За замовчуванням, Node.js не має вбудованої системи маршрутизації. Зазвичай вона реалізується за допомогою спеціальних фреймворків типу Express.















