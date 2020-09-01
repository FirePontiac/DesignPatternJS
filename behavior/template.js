// Определяет некотрый алгоритм (его скелет), но делегирует создание функционала уже в соседние классы
// Определяет структуру, а дочерние классы реазууют функционал, при это не изменяя поведение базового класса
class Emplovee { // Перевод, наёмный сотрудник
    constructor(name, salary) {
        this.name = name
        this.salary = salary // Перевод - зарплата ))
    }
    responsibilities() {} // не будем определять эту функцию, делегируем её на дочерние классы
    work() {
        return `${this.name} выполняет ${this.responsibilities()}`
    }
    getPaid() {
        return `${this.name} имеет ЗП ${this.salary}`
    }
} // На этой строке заканчивает базовый шаблон, далее создаём сотрудников пользуясь шаблоном

class Developer extends Emplovee {
    constructor(name, salary) {
        super(name, salary) // передаём сюда же эти параметры чтобы проинициализировать родительский конструктор
    }
    responsibilities() {
        return 'Прецесс создания программ'
    }
}

class Tester extends Emplovee {
    constructor(name, salary) {
        super(name, salary) // передаём сюда же эти параметры чтобы проинициализировать родительский конструктор
    }
    responsibilities() {
        return 'Прецесс тестирования'
    }
}

const dev = new Developer ('Ivan', 300000)
console.log(dev.getPaid())
console.log(dev.work())
const tester = new Tester('Виктория', 90000)
console.log(tester.getPaid())
console.log(tester.work())