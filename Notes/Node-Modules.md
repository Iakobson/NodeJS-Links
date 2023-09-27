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












