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


### Надсилання файлів

Наприклад, маємо таку структуру файлів:

```go
📁 Node-Project/
│
├─ package.json
├─ app.js
│
├─ 📁 views/
│   ├─ index.html
│   ├─ about.html
│
├─ 📁 public/
│   ├─ style.css
```

Реалізуємо функціонал відкриття в браузері різних html файлів:

```javascript
  // app.js
  const http = require("http");
  const fs = require("fs");
  
  http.createServer(function(request, response){      
    console.log(`Запрошена адреса: ${request.url}`);	
    /*
	  із request.url маємо URL-адресу, на яку надійшов запит
	  .substr(1) відсікає перший символ з URL, який зазвичай є слешем ("/")
	  таким чином отримуємо шлях після слешу
	*/
    const filePath = request.url.substr(1);
	  console.log(`Запрошена адреса: ${request.url}`);	  
    /* 
	   fs.access() перевіряє доступність файлу за шляхом filePath
	   fs.constants.R_OK - константа, якою перевіряємо права на читання файлу
	*/
    fs.access(filePath, fs.constants.R_OK, err => {
      // Якщо файл недоступний або відсутні права, то колбек отримає помилку.
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
		  // відбувається направлення даних з читаючого потоку у відповідь, що надсилається клієнту
            fs.createReadStream(filePath).pipe(response);
        }
      });
  }).listen(3000, function(){
    console.log("Server started at 3000");
  });

  // npm start 
  // http://localhost:3000/views/index.html
  // http://localhost:3000/views/about.html
```

### Отримання даних від клієнта

Функція зворотного виклику в ``http.createServer()`` викликається при отриманні всіх HTTP-заголовків, але не тіла запиту.
Крім того, сам об'єкт request являє собою потік, який отримує дані окремими чанками. 
Відповідно для отримання даних із запиту нам необхідно прослуховувати цей потік і послідовно витягувати їх отримані чанки інформації.

### Шаблони

Ми також можемо застосовувати спеціальні інструменти - шаблони, замість яких файл буде вставлятися якийсь певний текст.

Наприклад, змінимо файл about.html так:
```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Про сайт</title>
    </head>
    <body>
      <h1>{header}</h1>
      <p>{message}</p>
    </body>
  </html>
```

Тоді у файлі node нам допоможе такий код:
```javascript
  const http = require("http");
  const fs = require("fs");
 
  http.createServer(function(request, response){
     
    fs.readFile("index.html", "utf8", function(error, data){
        let header = "Сторінка про важливе";        
        let message = "Вивчаємо Node.js"; 
        data = data.replace("{header}", header).replace("{message}", message);
        response.end(data);
    })
  }).listen(3000);
```

### Маршрутизація

За замовчуванням, Node.js не має вбудованої системи маршрутизації. Зазвичай вона реалізується за допомогою спеціальних фреймворків типу Express.



