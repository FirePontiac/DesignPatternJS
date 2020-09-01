// Позволяет интегрировать старый интерфейс какого то класса в новый интерфейс
// и позволяет им работать совместно не ломая всё приложение
class OldCalc { // Класс
    operations(t1, t2, operation) { // Метод - он 
        switch (operation) { // Перебор
            case 'add': return t1 + t2
            case 'sub': return t1 - t2
            default: return NaN // Если нет совпадений, вернуть NaN, в JS у него тип Число
           // case 'divi': return t1 - t2
            // case 'mult': return t1 - t2
        }
    }
}

class NewCalc {
    add(t1,t2) {
        return t1 + t2
    }
    sub(t1,t2) {
        return t1 - t2
    }
}
// Выше есть 2 класса делают одно и то же а интерфейсы разные
class CalcAdapter {// Объединяем 2 класса получаем более высокую абстракцию
    constructor() { // Тут создам инстанс класса NewCalc
        this.calc = new NewCalc() // calc будет инстансом класса NewCalc
    }
    operations(t1, t2, operation) {// Но при этом старый метод 
        switch (operation) { // Перебор
            case 'add': return this.calc.add(t1, t2)
            case 'sub': return this.calc.sub(t1, t2)
            default: return NaN 
        }
    }
} // Адаптеры часто исполюзуются с разными API , есть старая API и есть новая API, адаптеры позволяют использовать старые интерфейсы, чтобы весть код не переписывать, а уже пользоваться новым функционалом

const oldCalc = new OldCalc()
console.log(oldCalc.operations(10, 5, 'add'))

const newCalc = new NewCalc()
console.log(newCalc.add(10,5))

const adapter = new CalcAdapter()
console.log(adapter.operations(25, 10, 'sub')) // Паттерн хорош для рефакторинга кода, и перехода на новые версии