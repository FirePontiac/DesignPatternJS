// Мы создаём обьект (или класс) у которого последовательно сможем получать доступ к определённой информации
class MyIterator {
    constructor(data) { // в data будем передавать данные
        this.index = 0 
        this.data = data
    }
    // Спец класс который эмулирует цикл for of в ES6 syntax и по нему работают генераторы
    [Symbol.iterator]() {
        return {
            next: () => { // => - для того чтобы контекст оставался класса MyIterartor
                // Перебираем
                if (this.index < this.data.length) { // если условие + то :
                    return {
                        value: this.data[this.index++],
                        done: false
                    }
                } else {
                    this.index = 0 // если дошли до конца, присваиваем индексу 0 е значение
                    return {
                        done: true,
                        value: undefined // или Void 0
                    }
                }
            }
        }
    }
}

const iterator = new MyIterator(['this', 'is', 'iterator']) // передаём массив
const gen = generator(['this', 'is', 'iterator'])

console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value) // undefined так как 3 его параметра нету

// for (const val of iterator) {  // без, просто циклом вывести, без console.log(gen.next().value)
//     console.log('Value', val)
// }

// Отдельный пример генератора
function* generator(collection) { // Что тут делает * ???
    let index = 0
    while (index < collection.length) {
        yield collection[index++]
    }
}

// console.log(gen.next().value)
// console.log(gen.next().value)
// console.log(gen.next().value)
// console.log(gen.next().value)