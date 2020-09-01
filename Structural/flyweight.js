// Служит для того чтобы эффективно передавать и работать с данными через различные типы обьектов
// Пример загруузка различных изображений, Браузер использует этот паттер чтобы избежать повторной загрузки тех или иных элементов которые уже были загружены
// Тут же кеширование, сохранение в память
class Car {
    constructor(model, price) {
        this.model = model
        this.price = price

    }
}

class CarFactory {
    constructor() {
        this.cars = []
    }

    create(model, price) {  // Будет дублировать функционал конструктора Car , только уже это будет доп абстракция позволяющая создать паттерн flyweight
        const candidate = this.getCar(model)
        if (candidate) {
            return candidate // Если этот возврат не сработал,  - значит что ещё нет машины данной модели
        }

        const newCar = new Car (model, price)
        this.cars.push(newCar)
        return newCar
    } 
    getCar(model) {
        return this.cars.find(car => car.model === model)  // Из Cars - в модель !
    }
}

const factory = new CarFactory()

const bmwX6 = factory.create('bmw', 10000)
const audi = factory.create('audi', 12000)
const bmwX3 = factory.create('bmw', 8000) // Нестыковочка, так как в в обьекте factory мы уже сохранили изначально 'bmw' в строке 34 и он у нас в КЕШЕ, этот паттерн помогает улучшать производительность приложения
console.log(bmwX6) // Получили Инстанс класса Car у которого присутствуют все данные
console.log(audi)
console.log(bmwX3)

console.log(bmwX3 === bmwX6) // Так не должно быть! 