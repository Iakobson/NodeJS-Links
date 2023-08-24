# Lab Node





- - -

### примітки

> це дуже важливо бо одна помилка і сервак впав

* бажано зробити middleware
  - в якому ти робиш json.verify(token, SECRET_KEY)
* обгортаєш це в try catch
  - там якщо токен не підходить по ключу то кидає помилку
* якщо токен пройшов то json.verify вертає закодований payload
  - який ти можеш присвоїти для req.user
* i викликати next
  - який уже попадає в твою основну функцію обробки, там витягуєш з req.user айдішку і по ній можеш сміло що хочеш шукати
* тут postgre база даних юзається

![middleware](https://github.com/Iakobson/NodeJS-Links/blob/main/Lab-Node/required-1.jpg)

При відправці форми з логіном і паролем отримуємо токен, перевіряєм чи все ок з респонсом і записуємо його в session storage.

![middleware](https://github.com/Iakobson/NodeJS-Links/blob/main/Lab-Node/required-2.jpg)

- - -


