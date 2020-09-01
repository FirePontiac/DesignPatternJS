// Декоратор дизайн паттерн
// С его помощью можно добавлять новое поведение или функционал для существующих классов
class Server {
    constructor(ip, port) {
        this.ip = ip
        this.port = port
    }
    get url() { // Геттер
        return `https://${this.ip}:${this.port}`
    }
}

function aws(server) {  // Декоратор принимает инстанс класаа но и возвращает его обратно
    server.isAWS = true   // isAWS - это флаг
    server.awsInfo = function () {
        return server.url  // так как url геттер тут метод не вызываем
    }
    return server
}

function azure(server) { // Тут свежедобавленный функционал
    server.isAzure = true
    server.port += 500 // инкремент на 500
    return server
}

const s1 = aws(new Server ('12.34.36.78', 8080)) // ЧТобы превратить обычный сервак в AWS спереди ставим декоратор
console.log(s1.isAWS)
console.log(s1.awsInfo())

const s2 = azure(new Server('98.15.37.40', 9560))
console.log(s2.isAzure)
console.log(s2.url) // Декораторы добавляют слой метаданных для уже существующих объектов