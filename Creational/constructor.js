// function Server(name, ip) { // Переменная сервер с большой буквы так как используется как конструктор( в действительности эта функция получается класс, к ней можно применить оператор New)
//    this.name = name
//    this.ip = ip
// }
// Server.prototype.getUrl = function() { // Старый синтаксис
//    return `https://${this.ip}:80`
// }
// Выше Старый Код Аккуратно (Там ES5 и ранее)
// Ныне 2020 Год:

class Server {
    constructor(name, ip){
        this.name = name
        this.ip = ip 
    }
    getUrl() {
        return `https://${this.ip}:80`
    }
}

const aws = new Server('AWS German', '82.21.21.32')     // Сам Инстанс(AWS), сам Паттерн Конструктор (название конструктора Server)
console.log(aws.getUrl()) // aws Обьект !