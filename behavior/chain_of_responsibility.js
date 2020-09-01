// Поведенчческий дизайн паттер помогает уличшать связь между обьектами разного типа
//  Последовательно у одного и того же обьекта позволяет вызывать опредеелённый набор операций
// И тем самым последовательно их модифицировать
// Характерный пример библиотека jquery
class MySum {
    constructor(initialValue = 42) {
        this.sum = initialValue
    }
    add(value) { // метод (Ту и есть этот метод chain_of_responsibility) он обязательно что то возвращает, без возврата будет ошибка
        this.sum += value // К sum прсваивает value
        return this // Тут самое важное 
    }
}

const sum1 = new MySum()
console.log(sum1.add(8))
console.log(sum1.add(8).add(10).add(1).add(4).sum) // .sum - это обращение к переменной
const sum2 = new MySum()
console.log(sum2.add(89).add(111).add(1).add(4).sum)