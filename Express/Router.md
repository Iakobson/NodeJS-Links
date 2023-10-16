# Express Router

_Router дозволяє визначити дочірні підмаршрути зі своїми обробниками щодо деякого головного маршруту._

Наприклад, маємо певний перелік маршрутів:
```javascript
  // визначаємо маршрути та їх обробники всередині роутера
  app.use("/about", function (request, response) {
    response.send("Інформація про компанію.");
  });

  productRouter.use("/products/create", function(request, response){
    response.send("Додавання товару");
  });

  app.use("/products/:id",function (request, response) {
    response.send(`Товар ${request.params.id}`);
  });
  app.use("/products/",function (request, response) {
    response.send("Список товарів");
  });

  app.use("/", function (request, response) {
    response.send("Головна сторінка");
  });
```

_Тут ми маємо п'ять маршрутів, які обробляються різними обробниками. Але три з цих маршрутів починаються з "/products" і умовно відносяться до деякого функціоналу роботи з товарами (перегляд списку товарів, перегляд одного товару по id і додавання товару). Об'єкт Router дозволяє зв'язати подібний функціонал в одне ціле та спростити керування ним._

```javascript
  // підключення express
  const express = require("express");
  const PORT = 5000;

  // створюємо об'єкт програми
  const app = express();

  // визначаємо Router
  const productRouter = express.Router();

  // визначаємо маршрути та їх обробники всередині роутера
  productRouter.use("/create", function(request, response){
    response.send("Додавання товару");
  });
  productRouter.use("/:id", function(request, response){
    response.send(`Інфо про товар ${request.params.id}`);
  });
  productRouter.use("/", function(request, response){
    response.send("Список усіх товарів");
  });

  // зіставляємо роутер із кінцевою точкою "/products"
  app.use("/products", productRouter);

  // шляхи переходів із головної сторінки
  app.use("/about", function (request, response) {
    response.send("Інформація про компанію.");
  });

  app.use("/", function (request, response) {
    response.send("Головна сторінка");
  });
```

## JSON и AJAX

Нехай ми маємо файл register.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Реєстрація</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>Сторінка реєстрації куди-небудь</h1>
	<p>Введіть свої дані у форму:</p>
    <form name="registerForm">
        <label>Ім'я</label><br>
        <input type="text" name="userName" /><br><br>
        <label>Вік</label><br>
        <input type="number" name="userAge" /><br><br>
		<button type="submit" id="submit">Відправити</button>
    </form>
	
  <script>
    document.getElementById("submit").addEventListener("click", function (e) {
      e.preventDefault();
      // отримуємо дані форми
      let registerForm = document.forms["registerForm"];
        let userName = registerForm.elements["userName"].value;
        let userAge = registerForm.elements["userAge"].value;
		
        // серіалізуємо дані в json
        let user = JSON.stringify({userName: userName, userAge: userAge});
        let request = new XMLHttpRequest();
		
        // надсилаємо запит на адресу "/user"
        request.open("POST", "/user", true);   
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
          // отримуємо і парсимо відповідь сервера
          let receivedUser = JSON.parse(request.response);
		  // дивимося відповідь сервера
          console.log(receivedUser.userName, "-", receivedUser.userAge); 
        });
      request.send(user);
    });
  </script>	
</body>
</html>
```

Ми отримуємо значення полів і серіалізмо в об'єкт json, який потім відправляється на сервер за допомогою ajax на адресу "/user".

Далі визначимо в головному файлі програми - в app.js код, який приймав би відправлені дані.\
І оскільки з клієнтом ми взаємодіємо через формат json, то дані клієнту відправляються за допомогою методу response.json().

```javascript
  // для отримання даних у форматі json необхідно створити парсер
  const jsonParser = express.json();

  app.post("/user", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    // відправляємо відповідь, що прийшла назад
    response.json(request.body); 
  });

  // http://localhost:5000/user
```

Насправді метод `response.json()` встановлює для заголовка "Content-Type" значення "application/json", сериалізує дані в json за допомогою функції `JSON.stringify()` і потім надсилає дані за допомогою `response.send()`.









