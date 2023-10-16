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








