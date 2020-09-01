// Позволяет создавть оболочку для различных интерфейсов , для использование разных алгоритмов для решения задачи
// Он пределает семейство некоторых алгоритмов, которые наследуют,  обьекты в неизменемом порядке
class Vehical {
    travelTime() {
        return this.timeTaken
    }
}

class Bus extends Vehical {
    constructor() {
        super()
        this.timeTaken = 10
    }
}
class Taxi extends Vehical {
    constructor() {
        super()
        this.timeTaken = 5
    }
}
class Car extends Vehical {
    constructor() {
        super()
        this.timeTaken = 3
    }
}

class Commute { // в переводе, затрачиваемое время на дорогу
    travel(transport) {
        return transport.travelTime()
    }
}

const commute = new Commute() // Тут можем проверять различные стратегии, не ломая предыдущий код

console.log(commute.travel(new Taxi()))
console.log(commute.travel(new Bus()))
console.log(commute.travel(new Car())) // В Итоге получили оболочку, которая взаимодействует с различными стратегиями но через 1 интерфейс неизменяемый