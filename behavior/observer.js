// Дизайн паттерн, может называться ещё Dispatcher, publisher subscriber lisener 
// Формирует зависимости один ко многим ! One to many dependesies
// Идея в том что есть 1 обьект у которого мы можем затригерить вызов изменений 
// Дальше все обьекты которые подписаны на эти изменения они получают обновления и далее по своему функционалу
// rx.js использует в своём корне этот паттерн а также Angular
class Subject { // В качестве name спейсинга будем использовать из rx.js
    constructor() {
        this.observers = [] // observers переменная , которая будет являться массивом и содержать в себе те observers которые мы будем добавлять для данного класса
    }
    subscribe(observer) { // метод subscribe обращается к массиву observers и добавляет в него нового observer
        this.observers.push(observer)
    }
    unsubscribe(observer) { //Проверна на наличие в массиве, если нет, то удаляем
        this.observers = this.observers.filter(obs => obs !== observer)
    }
    fire(action) {// можно этот метод называть emit
        this.observers.forEach(observer => { // переберём каждого, observer не просто функция а он является классом observers
            observer.update(action) // у класса реализуем метод update; в observers будут элементами массива являться функции
        })        
    }
}
class Observer { // Если просто хотим реализовать Dispacher то это может быть обычной call back функцией
// Так более гибкая и правильная концепция observer
    constructor(state=1) { // свой локальный state 
        this.state = state // Будем передавать в constructor
        this.initialState = state // для того что бы можно было вернуться к старому значению
    }   
    update(action) {
        switch (action.type) { // Тут будет строка на подобие redux, Тут может быть поле Type куда мы будем передавать action Pay load
        case 'INCREMENT':
            this.state = ++this.state
            break
        case 'DECREMENT':
            this.state = --this.state
            break
        case 'ADD':
            this.state += action.payload // 
            break
        default: this.state = this.initialState // можно и return
        } // 
    }
}


const stream$ = new Subject() // $ тут обозначает что это асинхронные динамичные вещи 

const obs1 = new Observer()
const obs2 = new Observer(42)
stream$.subscribe(obs1)
stream$.subscribe(obs2)

stream$.fire({type: 'INCREMENT'}) // А ля Redux
stream$.fire({type: 'INCREMENT'}) // С помощью этого метода можем тригерить новые собития
stream$.fire({type: 'DECREMENT'}) // Один из Этих диспатчей 4 х меняет весь State
stream$.fire({type: 'ADD', payload:10}) // изменяем на 10
// в концепте этого паттерна изменение одного, изменяет весь State 

console.log(obs1.state)
console.log(obs2.state)
