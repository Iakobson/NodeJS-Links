# Node Modules
> документація: https://nodejs.org/api/http.html



## модуль os
> _вбудований модуль, який надає функціональність для взаємодії з операційною системою_

#### Основні функції та властивості:
+ ``os.platform()``: =>> операційну систему, на якій виконується Node.js. Наприклад, "win32" для Windows, "linux" для Linux і так далі.
+ ``os.arch()``: =>>  архітектуру операційної системи, таку як "x64" або "x86".
+ ``os.cpus()``: =>>  масив об'єктів, які містять інформацію про CPU на вашому пристрої, включаючи кількість ядер і інші параметри.
+ ``os.totalmem()``: =>>  загальний обсяг фізичної пам'яті в байтах.
+ ``os.freemem()``: =>>  кількість доступної фізичної пам'яті в байтах.
+ ``os.userInfo()``: =>>  об'єкт із змінними про поточного користувача, такі як ім'я користувача, домашній каталог тощо.
+ ``os.networkInterfaces()``: =>>  об'єкт, який містить інформацію про мережеві інтерфейси на вашому пристрої.
+ ``os.hostname()``: =>>  ім'я хоста операційної системи


```javascript
  const os = require("os");
    // отримуємо дані з інформаційної системи
  console.log('platform: ', os.platform() );
    // =>> win32
  console.log('arch:', os.arch() );
    // =>> x64
  console.log('cpus:', os.cpus() );
    // =>> { object }
  console.log('totalmem:', os.totalmem() );
    // =>> 17 002 713 088
  console.log('freemem:', os.freemem() );
    // =>> 11 361 783 808
  console.log('userInfo:', os.userInfo() );
  /* =>> 
   {
      uid: -1,
      gid: -1,
      username: 'SS',
      homedir: 'C:\\Users\\SS',
      shell: null
    }  
  */
  console.log('networkInterfaces:', os.networkInterfaces() );
  /* =>> 
   {
	 'Беспроводная сеть': [],
	 'Loopback Pseudo-Interface 1': [],
   }  
  */
  console.log('hostname:', os.hostname() );
    // =>> DESKTOP-O1HTTS6
```

**Приклад, із використанням користувацького модуля:**
> _Об'єкт module.exports - це те, що функція require() повертається при отриманні модуля._

```javascript
  // greeting.js
  let currentDate = new Date();
  module.exports.date = currentDate;
 
  module.exports.getMessage = function(name){
    let hour = currentDate.getHours();
    if(hour > 18)
        return "Доброго вечора, " + name;
    else if(hour > 11)
        return "Добрий день, " + name;
    else
        return "Доброго ранку, " + name;
  }
```

> _Усі експортовані методи та властивості модуля доступні на ім'я: greeting.date та greeting.getMessage()._

```javascript
  // node module.js
  const os = require("os");
  const greeting = require("./greeting");
 
  // отримаємо ім'я поточного користувача
  let userName = os.userInfo().username;
  
  console.log(`Дата запиту: ${greeting.date}`);
    // =>> Дата запиту: Wed Sep 27 2023 17:30:47 GMT+0300
  console.log(greeting.getMessage(userName));
    // =>> Добрий день, SS
```

### функція конструктор
> _у модулі можуть визначатися складні об'єкти чи функції конструкторів, які потім використовуються для створення об'єктів_

```javascript
  // user.js
  function User(name, age){
     
    this.name = name;
    this.age = age;
    this.displayInfo = function(){         
        console.log(`Ім'я: ${this.name}  Вік: ${this.age}`);
    }
  }
  User.prototype.sayHi = function() {
    console.log(`Привіт, мене звати ${this.name}!`);
  };
 
  module.exports = User;
```

**Підключимо та використаємо цей модуль у файлі**

```javascript
  const User = require("./user.js");
 
  let morgan = new User("Morgan", 36);
  morgan.displayInfo();
    // =>> Ім'я: Morgan  Вік: 36
  morgan.sayHi();  
    // =>> Привіт, мене звати Morgan!
```

> _якщо у проекті є каталог, який містить файл з ім'ям index.js, ми можемо звертатися до модуля на ім'я каталогу_
```go
📁 common/      
    ├─ ProductCard.jsx
    ├─ SectionTitle.jsx
    ├─ index.jsx 
```


## модуль fs
> _це вбудований модуль в Node.js, який надає функціональність для роботи з файловою системою комп'ютера. Цей модуль дозволяє читати файли, записувати дані в файли, створювати файли та папки, видаляти файли і багато іншого. Він є одним з основних модулів, які використовуються при роботі з файлами та даними на диску._

Документація: https://nodejs.org/api/fs.html

**Основні функції та методи, які надає модуль fs, включають:**
+ Читання файлів:
  - ``fs.readFile()``: Читає вміст файлу асинхронно та передає його в колбек-функцію.
  - ``fs.readFileSync()``: Читає вміст файлу синхронно та повертає його.
+ Запис файлів:
  - ``fs.writeFile()``: Записує дані в файл асинхронно або створює файл, якщо він не існує.
  - ``fs.writeFileSync()``: Записує дані в файл синхронно або створює файл, якщо він не існує.
+ Створення та видалення папок і файлів:
  - ``fs.mkdir()``: Створює нову папку асинхронно.
  - ``fs.mkdirSync()``: Створює нову папку синхронно.
  - ``fs.rmdir()``: Видаляє папку асинхронно.
  - ``fs.rmdirSync()``: Видаляє папку синхронно.
  - ``fs.unlink()``: Видаляє файл асинхронно.
  - ``fs.unlinkSync()``: Видаляє файл синхронно.
+ Перейменування файлів і папок:
  - ``fs.rename()``: Перейменовує файл або папку асинхронно.
+ Статистика файлів та папок:
  - ``fs.stat()``: Повертає інформацію про файл або папку асинхронно.
  - ``fs.statSync()``: Повертає інформацію про файл або папку синхронно.
+ Перевірка існування файлів та папок:
  - ``fs.existsSync()``: Перевіряє, чи існує файл або папка.
+ Читання списку файлів у папці:
  - ``fs.readdir()``: Читає список файлів та папок у заданій директорії асинхронно.
+ Потоки для великих файлів:
  - ``fs.createReadStream()``: Створює читаєчий потік для великих файлів.
  - ``fs.createWriteStream()``: Створює записувальний потік для великих файлів.

Модуль fs дозволяє вам взаємодіяти з файловою системою вашого комп'ютера з використанням Node.js і виконувати різні операції з файлами та папками у вашому програмному коді.









