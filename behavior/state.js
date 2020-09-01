// Можем создавать различные каласса которые являются элементами state и можем делегировать изменения состония этих классов
// На какой то общий класс, и который будет менять внутренее состояние отдельных элементов
// Вся логика будет построена на вернеуровневом класе который будет менять значение
class Light {
    constructor(light) {
        this.light = light // Переводится как цвет, на его основе создаим 3 класса
    }    
} // Светофор

class RedLight extends Light {
    constructor() { // Далее передаём в суперконструктор
        super('red')
    }
    sign() { // ???
        return 'СТОП'
    }
}

class YellowLight extends Light {
    constructor() { // Далее передаём в суперконструктор
        super('yellow')
    }
    sign() { // ???
        return 'Ready'
    }
}

class GreenLight extends Light {
    constructor() { // Далее передаём в суперконструктор
        super('green')
    }
    sign() { // ???
        return 'Let go'
    }
}

class TraficLight {
    constructor() {
        this.states = [ // массив из классов
            new RedLight(),
            new YellowLight(),
            new GreenLight()
        ]
        this.current = this.states[0] // текущее состояние которое записываем в current
    }
    change() { // вроде переменная в классе, а на самом деле метод
      const total = this.states.length  // тут надо придумать логику каторая поочерёдно будет показывать цвета, поочередно изменять состояние state
      let index = this.states.findIndex(light => light === this.current) // тут сразу 2 сравнения, найдём текущее состояния
      // states тут определаем динамически, относительно current
      if (index + 1 < total) { // если выполняется то переключить на следующее состояние state
        this.current = this.states[index + 1]
      } else { // если не выполняется , то переключится на начальное состояние state
          this.current = this.states[0] // 0 - это индекс массива
      }
    }
    sign() { // тут будет показывать текущий знак
        return this.current.sign() // так как у каждого класса есть current sign можем его вызвать
    }
}

// Применение данного дизайн паттерна
const traffic = new TraficLight()
console.log(traffic.sign()) // В сам паттерн уже не лезем а меням уже только тут, удобно для организации например роутинга
traffic.change() // 
console.log(traffic.sign())
traffic.change()
console.log(traffic.sign())
traffic.change()