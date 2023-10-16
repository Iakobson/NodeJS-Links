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













