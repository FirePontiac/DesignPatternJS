// Идея - существует какой то класс в приложении например и в приложении может быть только лишь 1 инстанс данного класса !
// Работа в БД; ОРМ Мангуст, помогает коннектится к Mongo DB (тут и используется этот паттерн синглтон) для того чтобы избежать лишних подключений к базе данных
// использует 1 инстанс обьекта и в случа если уже 1 инстанс есть то используем существующее соединение
class Database {  // Эмулируем подключение к БД
    constructor(data) {  // или строда, данные в скобках, которые нужна для инициализации БД
        if (Database.exists) { // Важные 3 строки, если при инициализации класса Database уже существует флаг exists,  а он то уже раньше был инициализирован ниже
            return Database.instance  // То надо остановить процесс создания нового инстанса,  и вернуть старый инстанс
        }  // В таком случае, если уже имеется инстанс Return остановит выполнение конструктора и вернёт стары инстанс
        Database.instance = this  // Эта строка определит что это будет сингтоном
        Database.exists = true // Флаг exists готоврит что инстанс уже инициализирован
        this.data = data
    }
    // Тут реализуем методы
    getData() {
        return this.data
    }
}

const mongo = new Database('MongoDB') // Создадим тестовую БД Тут можно поэксперементировать
console.log(mongo.getData()) // getData это метод

const mysql = new Database('MySQL') // Эта константа отправляется на проверку в конструктор, который обратно в переменную mysql возвращает старый (первый) инстанс
console.log(mysql.getData()) // А в консоли всё равно будет MongoDB, чо угодно не добавляй всё равно будет MongoDB - это и есть суть синглтона
// Это были 4 Createtional дизайн патерна
// Далее будут 4 структурных